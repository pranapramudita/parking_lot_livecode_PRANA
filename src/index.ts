import Car from './oop/car.js'
import { Action, ParkingLot } from './parkinglot.js'

const mobil1: Car = new Car('BE001','Alex','mobil1')
const mobil2: Car = new Car('B2021','Blex','mobil2')
const mobil3: Car = new Car('C012','Clex','mobil3')
const mobil4: Car = new Car('D0101','Dlex','mobil4')
const mobil5: Car = new Car('EE001','Elex','mobil5')

export const mobilList: Car[] = [mobil1,mobil2,mobil3,mobil4,mobil5]

const parkingLot = new ParkingLot(3)

async function actions(): Promise<void> {
    try {
        const action = await parkingLot.parkingLot()
        try {
            console.log(await action.park(mobil1))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.check())
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.park(mobil2))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.leave('B2021'))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.park(mobil3))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.park(mobil4))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.leave('B2019'))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.park(mobil5))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.park(mobil1))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.leave('B2021'))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.check())
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.leave('BE001'))
        } catch (error) {
            console.log(error)
        }
        try {
            console.log(await action.check())
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error);
    }
}

actions()