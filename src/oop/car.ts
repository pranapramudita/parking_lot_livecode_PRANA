export default class Car {
    nopol: string    // Nomor Polisi
    pemilik: string  // Nama Pemilik
    mobilVar: string

    constructor(nopol: string, pemilik: string, mobilVar: string) {
        this.nopol = nopol
        this.pemilik = pemilik
        this.mobilVar = mobilVar
    }
}