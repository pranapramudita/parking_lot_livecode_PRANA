import { catchError, of, switchMap, tap } from 'rxjs'
import Car from './oop/car.js'
import { Action, ParkingLot } from './parkinglot.js'

const mobil1: Car = new Car('BE001','Alex','mobil1')
const mobil2: Car = new Car('B2021','Blex','mobil2')
const mobil3: Car = new Car('C012','Clex','mobil3')
const mobil4: Car = new Car('D0101','Dlex','mobil4')
const mobil5: Car = new Car('EE001','Elex','mobil5')

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

            switchMap(() => action.leave(`B2019`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil5)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.park(mobil1)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`B2021`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.check()),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.leave(`BE001`)),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

            switchMap(() => action.check()),
            catchError((error) => of(error)),
            tap((output) => console.log(output)),

        ).subscribe()
    })
).subscribe()
