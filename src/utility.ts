import Car from "./oop/car";

export function getCarByNopol(nopol: string, list: Car[]): Car {
    return list.find((car) => car.nopol === nopol)
}

export function getCar(findCar: Car, list: Car[]): Car {
    return list.find((car) => car.nopol === findCar.nopol)
}

export function carIndex(findCar: Car, list: Car[]): number {
    return list.findIndex((car) => car.nopol === findCar.nopol)
}
