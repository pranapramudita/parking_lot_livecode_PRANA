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

    async park(car: Car): Promise<string> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                if(this.remaining > 0 && !getCar(car,this.parkedCars)) {
                    this.parkedCars.push(car)
                    this.remaining -= 1
                    resolve(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`)
                } else if(getCar(car,this.parkedCars)) {
                    reject(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`)
                } else if(this.remaining === 0) {
                    reject(`Mohoh maaf parkir sudah penuh.`)
                } 
            }, 3000)
        })
    }

    async leave(nopol: string): Promise<string> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const car: Car = getCarByNopol(nopol,mobilList)
                if(car && getCar(car,this.parkedCars)) {
                    this.parkedCars.splice(carIndex(car,this.parkedCars),1)
                    this.remaining += 1
                    resolve(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah keluar.`)
                } else {
                    reject(`Mobil dengan nopol ${nopol} tidak ada.`)
                }
            }, 1500)
        })
    }

    async check(): Promise<string> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(this.print())
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

    async parkingLot(): Promise<Action> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(this.actions)
            }, 5000);
        })
    }
}