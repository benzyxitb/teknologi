function getInputElement(id: string): HTMLInputElement {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`Elemen ${id} tidak ditemukan atau bukan input.`);
    }
    return element;
}

const inputNama: HTMLInputElement = getInputElement("namaPengirim");
const inputBerat: HTMLInputElement = getInputElement("berat");
const inputJarak: HTMLInputElement = getInputElement("jarak");

const tombolElement = document.getElementById("btnHitung");
if (!(tombolElement instanceof HTMLButtonElement)) {
    throw new Error("Elemen btnHitung tidak ditemukan atau bukan tombol.");
}
const btnHitung: HTMLButtonElement = tombolElement;

const hasilElement = document.getElementById("hasilOngkir");
if (!(hasilElement instanceof HTMLElement)) {
    throw new Error("Elemen hasilOngkir tidak ditemukan.");
}
const hasilOngkir: HTMLElement = hasilElement;

function hitungOngkir(): void {
    const nama = inputNama.value.trim();
    const berat = Number(inputBerat.value);
    const jarak = Number(inputJarak.value);

    if (!Number.isFinite(berat) || berat <= 0 || !Number.isFinite(jarak) || jarak <= 0) {
        hasilOngkir.innerHTML = "Error: Data tidak valid.";
        return;
    }

    let zona: string;
    let tarifPerKm: number;

    if (jarak <= 10) {
        zona = "Zona 1";
        tarifPerKm = 1000;
    } else if (jarak <= 50) {
        zona = "Zona 2";
        tarifPerKm = 1500;
    } else if (jarak <= 200) {
        zona = "Zona 3";
        tarifPerKm = 2000;
    } else if (jarak <= 500) {
        zona = "Zona 4";
        tarifPerKm = 2500;
    } else {
        zona = "Zona 5";
        tarifPerKm = 3500;
    }

    const ongkosKirim = (berat * 3000) + (jarak * tarifPerKm);
    const namaAman = nama.replace(/[&<>"']/g, (karakter: string) => {
        const entitas: { [karakter: string]: string } = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return entitas[karakter];
    });

    hasilOngkir.innerHTML =
        `Pengirim: ${namaAman}<br>` +
        `Tujuan: ${zona}<br>` +
        `Ongkos kirim: Rp${ongkosKirim}`;
}

btnHitung.addEventListener("click", hitungOngkir);