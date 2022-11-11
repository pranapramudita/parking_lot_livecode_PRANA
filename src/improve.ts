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

export function getCarIndex(findCar: Car, carList: Car[]): number {
    return carList.findIndex((car) => car.nopol === findCar.nopol)!
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

    static carByNopolNotInPark(nopol: string): string {
      return `Mobil dengan nopol ${nopol} tidak ada di parkiran.`
    }

    static leaveCarSuccess(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah keluar.`
    }

    static print(capacity: number, remaining: number, parkedCars: Car[]): string {
      return (`{ capacity: ${capacity}, remaining: ${remaining}, parkedCars: [${parkedCars.map((e) => e.mobilVar).join(', ')}] }`)
    }
    
    static parkSuccess(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`
    }

    static parkFailed(car: Car): string {
      return `Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`
    }

    static parkFull(): string {
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
                if(isParked(car,this.parkedCars)) {
                    return observer.error(MessageTemplate.parkFailed(car))
                } else if(this.parkingSpotFull(this.remaining)) {
                    return observer.error(MessageTemplate.parkFull())
                }
                this.parkCar(car);
                return observer.next(MessageTemplate.parkSuccess(car))
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
                    return observer.error(MessageTemplate.carByNopolNotInPark(nopol)) 
                }
                this.leaveCar(nopol)
                return observer.next(MessageTemplate.leaveCarSuccess(car))
            }, 0)
        })
    }

    check(): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                return observer.next(this.print())
            }, 0)
        })
    }

    print(): string {
        return MessageTemplate.print(this.capacity,this.remaining,this.parkedCars)
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
      return remaining == 0
    }
}

export class ParkingLot {
    private readonly actions: Action

    constructor(capacity: number) {
        this.actions = new Action(capacity)
        console.log(MessageTemplate.parkingSpotCreated(capacity));
    }

    parkingLot(): Observable<Action> {
        return new Observable((observer: Observer<Action>) => {
            setTimeout(() => {
                observer.next(this.actions)
            }, 0);
        })
    }
}

const mobil1: Car = new Car('BE 001 PK','Alex','Avanza')
const mobil2: Car = new Car('PR 4 NA','Prana','Tesla')
const mobil3: Car = new Car('BG 012 A','Robert','Xenia')
const mobil4: Car = new Car('BH 101 KA','Albert','Voxy')
const mobil5: Car = new Car('K 999 AI','Sophia','Alphard')

export const mobilList: Car[] = [mobil1,mobil2,mobil3,mobil4,mobil5]

const parkingLot = new ParkingLot(3)

parkingLot.parkingLot().pipe(
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
