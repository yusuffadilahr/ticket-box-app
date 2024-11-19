export default function syaratDanKetentuan() {
    return (
        <div className="max-w-screen-lg pt-20 lg:pt-36 mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
                Syarat dan Ketentuan
            </h1>
            <div className="text-gray-700 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        1. Pendahuluan
                    </h2>
                    <p className="text-sm sm:text-base">
                        Terima kasih telah mengunjungi TiketBox! Dengan menggunakan layanan
                        kami, Anda menyetujui untuk mematuhi syarat dan ketentuan berikut.
                        Jika Anda tidak setuju dengan syarat ini, harap berhenti
                        menggunakan layanan kami.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        2. Definisi
                    </h2>
                    <p className="text-sm sm:text-base">
                        Berikut adalah beberapa istilah yang digunakan dalam dokumen ini:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-sm sm:text-base">
                            <strong>“Layanan”</strong>: Mengacu pada semua produk dan layanan
                            yang ditawarkan oleh TiketBox.
                        </li>
                        <li className="text-sm sm:text-base">
                            <strong>“Pengguna”</strong>: Siapa pun yang mengakses atau
                            menggunakan layanan TiketBox.
                        </li>
                        <li className="text-sm sm:text-base">
                            <strong>“Tiket”</strong>: Produk yang dijual melalui platform
                            kami, termasuk tiket acara, konser, dan lainnya.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        3. Ketentuan Penggunaan
                    </h2>
                    <p className="text-sm sm:text-base">
                        Dengan menggunakan layanan TiketBox, Anda setuju untuk mematuhi
                        peraturan berikut:
                    </p>
                    <ul className="list-decimal pl-6 space-y-2">
                        <li className="text-sm sm:text-base">
                            Tidak diperbolehkan menggunakan layanan untuk tujuan ilegal atau
                            tidak sah.
                        </li>
                        <li className="text-sm sm:text-base">
                            Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun
                            Anda.
                        </li>
                        <li className="text-sm sm:text-base">
                            Semua transaksi harus dilakukan dengan itikad baik dan sesuai
                            hukum.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        4. Kebijakan Pengembalian Dana
                    </h2>
                    <p className="text-sm sm:text-base">
                        Pengembalian dana hanya akan diproses jika memenuhi syarat berikut:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-sm sm:text-base">
                            Acara dibatalkan oleh penyelenggara.
                        </li>
                        <li className="text-sm sm:text-base">
                            Tiket yang diterima dalam kondisi cacat atau rusak.
                        </li>
                        <li className="text-sm sm:text-base">
                            Permintaan pengembalian dana diajukan sebelum batas waktu yang
                            ditentukan.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        5. Hak Kekayaan Intelektual
                    </h2>
                    <p className="text-sm sm:text-base">
                        Semua konten yang ditampilkan di situs TiketBox, termasuk namun tidak
                        terbatas pada teks, gambar, logo, dan desain, adalah hak milik kami
                        atau mitra kami. Dilarang keras untuk menduplikasi, menyebarkan,
                        atau menggunakan konten tersebut tanpa izin tertulis dari kami.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        6. Batasan Tanggung Jawab
                    </h2>
                    <p className="text-sm sm:text-base">
                        TiketBox tidak bertanggung jawab atas kerugian yang terjadi akibat:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-sm sm:text-base">
                            Kesalahan pengguna dalam memasukkan data.
                        </li>
                        <li className="text-sm sm:text-base">
                            Pembatalan acara oleh penyelenggara.
                        </li>
                        <li className="text-sm sm:text-base">
                            Gangguan teknis yang berada di luar kendali kami.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        7. Perubahan pada Syarat dan Ketentuan
                    </h2>
                    <p className="text-sm sm:text-base">
                        Kami berhak mengubah syarat dan ketentuan ini kapan saja tanpa
                        pemberitahuan sebelumnya. Anda disarankan untuk memeriksa halaman
                        ini secara berkala.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        8. Kontak
                    </h2>
                    <p className="text-sm sm:text-base">
                        Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan
                        hubungi kami melalui email di{" "}
                        <a
                            href="mailto:tiketbox88@gmail.com"
                            className="text-blue-600 hover:underline"
                        >
                            tiketbox88@gmail.com
                        </a>{" "}
                        atau melalui nomor telepon yang tersedia di situs web kami.
                    </p>
                </section>
            </div>
        </div>
    )
}