function getInputElement(id: string): HTMLInputElement {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Elemen ${id} tidak ditemukan atau bukan input.`);
    }
    return element;
}

const kendaraan: HTMLInputElement = getInputElement("kendaraan");
const lamaSewa: HTMLInputElement = getInputElement("lamaSewa");
const tarifHari: HTMLInputElement = getInputElement("tarifHari");

const tombolElement = document.getElementById("btnSimpan");
if (!(tombolElement instanceof HTMLButtonElement)) {
    throw new Error("Elemen btnSimpan tidak ditemukan atau bukan tombol.");
}
const btnSimpan: HTMLButtonElement = tombolElement;

const hasilElement = document.getElementById("hasil");
if (!(hasilElement instanceof HTMLElement)) {
    throw new Error("Elemen hasil tidak ditemukan.");
}
const hasil: HTMLElement = hasilElement;

const daftarKendaraan: string[] = [];
const daftarLama: number[] = [];
const daftarTarif: number[] = [];
const daftarBiaya: number[] = [];

function hitungBiayaSewa(lama: number, tarif: number): number {
    return lama * tarif;
}

function hitungTotalPendapatan(): number {
    let total = 0;
    for (let i = 0; i < daftarBiaya.length; i++) {
        total += daftarBiaya[i];
    }
    return total;
}

function tampilkanData(): void {
    hasil.innerHTML = "";

    for (let i = 0; i < daftarKendaraan.length; i++) {
        const kendaraanAman = daftarKendaraan[i].replace(/[&<>"']/g, (karakter: string) => {
            const entitas: { [karakter: string]: string } = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            };
            return entitas[karakter];
        });

        hasil.innerHTML +=
            `Kendaraan: ${kendaraanAman}<br>` +
            `Lama Sewa: ${daftarLama[i]} hari<br>` +
            `Tarif per Hari: ${daftarTarif[i]}<br>` +
            `Biaya Sewa: ${daftarBiaya[i]}<br>`;
    }

    hasil.innerHTML += `Total Pendapatan: Rp${hitungTotalPendapatan()}`;
}

function resetInput(): void {
    kendaraan.value = "";
    lamaSewa.value = "";
    tarifHari.value = "";
}

function simpanData(): void {
    daftarKendaraan.push(kendaraan.value.trim());
    daftarLama.push(Number(lamaSewa.value));
    daftarTarif.push(Number(tarifHari.value));

    const indeksBaru = daftarKendaraan.length - 1;
    const biaya = hitungBiayaSewa(daftarLama[indeksBaru], daftarTarif[indeksBaru]);
    daftarBiaya.push(biaya);

    tampilkanData();
    resetInput();
}

btnSimpan.addEventListener("click", simpanData);