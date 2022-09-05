import { Observable, Observer } from "rxjs"
import { mobilList } from "."
import Car from "./oop/car"
import { getCar, getCarByNopol, carIndex } from "./utility"

export class Action {
    capacity: number   
    remaining: number  
    parkedCars: Car[]  

    constructor(capacity: number) {
        this.capacity = capacity
        this.remaining = this.capacity
        this.parkedCars = []
    }

    print(): string {
        return `{ capacity: ${this.capacity}, remaining: ${this.remaining}, parkedCars: [${this.parkedCars.map((e) => e.mobilVar).join(', ')}] }`
    }

    park(car: Car): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                if(this.remaining > 0 && !getCar(car,this.parkedCars)) {
                    this.parkedCars.push(car)
                    this.remaining -= 1
                    observer.next(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`)
                } else if(getCar(car,this.parkedCars)) {
                    observer.error(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`)
                } else if(this.remaining === 0) {
                    observer.error(`Mohoh maaf parkir sudah penuh.`)
                } 
            }, 3000)
        })
    }

    leave(nopol: string): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                const car: Car = getCarByNopol(nopol,mobilList)
                if(car && getCar(car,this.parkedCars)) {
                    this.parkedCars.splice(carIndex(car,this.parkedCars),1)
                    this.remaining += 1
                    observer.next(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah keluar.`)
                } else {
                    observer.error(`Mobil dengan nopol ${nopol} tidak ada.`)
                }
            }, 1500)
        })
    }

    check(): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            setTimeout(() => {
                observer.next(this.print())
            }, 500)
        })
    }
}

export class ParkingLot {
    private readonly actions: Action

    constructor(capacity: number) {
        this.actions = new Action(capacity)
        console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan`);
    }

    parkingLot(): Observable<Action> {
        return new Observable((observer: Observer<Action>) => {
            setTimeout(() => {
                observer.next(this.actions)
            }, 5000);
        })
    }
}