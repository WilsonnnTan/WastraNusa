declare module 'daftar-wilayah-indonesia' {
  export interface Wilayah {
    kode: string;
    nama: string;
  }

  export function provinsi(): Wilayah[];
  export function kabupaten(kodeProvinsi: string): Wilayah[];
  export function kecamatan(kodeKabupaten: string): Wilayah[];
  export function kelurahan(kodeKecamatan: string): Wilayah[];
}
