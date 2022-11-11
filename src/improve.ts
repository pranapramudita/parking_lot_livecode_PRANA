import { Observable, Observer, catchError, of, switchMap, tap } from "rxjs"

export default class Car {
    nopol: string          // Nomor Polisi
    pemilik: string        // Nama Pemilik
    mobilVar: string       // Nama Variabel

    constructor(nopol: string, pemilik: string, mobilVar: string) {
        this.nopol = nopol
        this.pemilik = pemilik
        this.mobilVar = mobilVar
    }
}

export function isParked(car: Car, carList: Car[]): Boolean {
    return getCarByNopol(car.nopol,carList) != null
}

export function isParkedByNopol(nopol: string, carList: Car[]): Boolean {
    return getCarByNopol(nopol,carList) != null
}

export function getCarByNopol(nopol: string, carList: Car[]): Car {
    return carList.find((car) => car.nopol === nopol)!
}

export function getCarIndex(car: Car, carList: Car[]): number {
    return carList.findIndex((car) => car.nopol === car.nopol)!
}

export function getCarIndexByNopol(nopol: string, carList: Car[]): number {
    return getCarIndex(getCarByNopol(nopol, carList), carList)
}

export class MessageTemplate {
    static parkingSpotCreated(capacity: number): string {
      return `Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`
    }

    static carByNopolNotFound(nopol: string): string {
      return `Mobil dengan nopol ${nopol} tidak ada.`
    }

    static carByNopolNotInParkingSpot(nopol: string): string {
      return `Mobil dengan nopol ${nopol} tidak ada di parkiran.`
    }

    static carLeft(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah keluar.`
    }

    static printStatus(action: Action): string {
      let parkedCars: string = action.parkedCars.map((car) => car.mobilVar).join(', ')
      return (`{ capacity: ${action.capacity}, remaining: ${action.remaining}, parkedCars: [${parkedCars}] }`)
    }
    
    static carParked(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`
    }

    static carIsInParkingSpot(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`
    }

    static parkingSpotFull(): string {
      return `Mohoh maaf parkir sudah penuh.`
    }
}

export class Action {
    capacity: number   
    remaining: number  
    parkedCars: Car[]  

    constructor(capacity: number) {
        this.capacity = capacity
        this.remaining = this.capacity
        this.parkedCars = []
    }

    park(car: Car): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                if(this.parkingSpotFull(this.remaining)) {
                    return observer.error(MessageTemplate.parkingSpotFull())
                }
                if(isParked(car,this.parkedCars)) {
                    return observer.error(MessageTemplate.carIsInParkingSpot(car))
                }
                this.parkCar(car);
                return observer.next(MessageTemplate.carParked(car))
            }, 0)
        })
    }

    leave(nopol: string): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                const car = getCarByNopol(nopol,mobilList)
                if(!car) {
                    return observer.error(MessageTemplate.carByNopolNotFound(nopol)) 
                }
                if(!isParkedByNopol(nopol,this.parkedCars)) {
                    return observer.error(MessageTemplate.carByNopolNotInParkingSpot(nopol)) 
                }
                this.leaveCar(nopol)
                return observer.next(MessageTemplate.carLeft(car))
            }, 0)
        })
    }

    check(): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                let message: string = MessageTemplate.printStatus(this)
                return observer.next(message)
            }, 0)
        })
    }

    parkCar(car: Car) {
      this.parkedCars.push(car)
      this.remaining -= 1
    }

    leaveCar(nopol: string) {
      this.parkedCars.splice(getCarIndexByNopol(nopol,this.parkedCars),1)
      this.remaining += 1
    }

    parkingSpotFull(remaining: number): Boolean {
      return remaining == 0 || remaining <= 0
    }
}

export class ParkingLot {
    private readonly actions: Action

    constructor(capacity: number) {
        this.actions = new Action(capacity)
        if(this.actions) {
          console.log(MessageTemplate.parkingSpotCreated(capacity))
        }
    }

    start(): Observable<Action> {
        return new Observable((observer: Observer<Action>) => {
            setTimeout(() => {
                observer.next(this.actions)
            }, 0);
        })
    }
}

const parkingLot = new ParkingLot(3)

const mobil1: Car = new Car('BE 001 PK','Alex','Avanza')
const mobil2: Car = new Car('PR 4 NA','Prana','Tesla')
const mobil3: Car = new Car('BG 012 A','Robert','Xenia')
const mobil4: Car = new Car('BH 101 KA','Albert','Voxy')
const mobil5: Car = new Car('K 999 AI','Sophia','Alphard')

export const mobilList: Car[] = [mobil1,mobil2,mobil3,mobil4,mobil5]

parkingLot.start().pipe(
    tap((action) => {
        action.park(mobil1).pipe(
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.check()),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil2)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`B2021`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil3)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil4)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`PR 4 NA`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil5)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil1)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`BG 012 A`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.check()),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`K 999 AI`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.check()),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

        ).subscribe()
    })
).subscribe()
