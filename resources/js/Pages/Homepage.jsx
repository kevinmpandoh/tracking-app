import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router, usePage, Link } from "@inertiajs/react";
import Tracking from "@/Components/Tracking";

export default function Homepage({ auth, document, search }) {
    const [searchInput, setSearchInput] = useState(search || "");
    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/", { search: searchInput }, { replace: true });
    };
    return (
        <GuestLayout>
            <Head title="Homepage" />

            <nav className="absolute top-0 right-15 p-6">
                {!auth.user ? (
                    <Link
                        href={route("login")}
                        className="rounded-md px-3 py-2 font-semibold text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Log in
                    </Link>
                ) : (
                    <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2 font-semibold text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Dashboard
                    </Link>
                )}
            </nav>

            <div className="mb-10">
                <div className="flex flex-col items-center mt-20">
                    <h1 className="text-3xl font-semibold text-center">
                        Cek Status Berkas Anda
                    </h1>
                    <p className="text-center text-gray-600 mt-4">
                        Masukkan nomor berkas
                    </p>
                </div>

                <form onSubmit={handleSearch}>
                    <div className="flex mt-10 rounded-md border-2  border-primary overflow-hidden max-w-md mx-auto font-[sans-serif]">
                        <input
                            type="text"
                            placeholder="Cari berkas..."
                            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-primary px-5"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 192.904 192.904"
                                width="16px"
                                className="fill-white"
                            >
                                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {document ? (
                <div className="p-10 mt-10 mx-auto border-t-2">
                    {/* menampilkan infromasi berkas seperti nomor berkas, nama berkas */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-semibold text-center">
                            Informasi Berkas
                        </h1>
                        <p className="text-center text-gray-600 mt-2">
                            Berikut adalah informasi berkas yang anda cari
                        </p>
                    </div>

                    <div className="flex flex-col my-10">
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="flex flex-col mt-4 md:w-1/2">
                                <p className="text-gray-600 mt-4">
                                    Nama Berkas
                                </p>
                                <h1 className="text-xl font-semibold">
                                    {document.name}
                                </h1>
                                <p className="text-gray-600">Nomor Berkas</p>
                                <h1 className="text-xl font-semibold">
                                    {document.document_number}
                                </h1>
                            </div>
                            <div className="flex flex-col mt-4 md:w-1/2">
                                <p className="text-gray-600">Jenis Berkas</p>
                                <h1 className="text-xl font-semibold">
                                    {document.type}
                                </h1>

                                <p className="text-gray-600 mt-4">Status</p>
                                <h1 className="text-xl font-semibold">
                                    {/* Buat badge */}
                                    <span
                                        className={`${
                                            document.tracking_steps[
                                                document.tracking_steps.length -
                                                    1
                                            ].status === "completed"
                                                ? "bg-success"
                                                : "bg-warning"
                                        } text-white py-1 px-2 font-semibold rounded-full text-sm`}
                                    >
                                        {document.tracking_steps[
                                            document.tracking_steps.length - 1
                                        ].status === "completed"
                                            ? "Selesai"
                                            : "Sedang Diproses"}
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="container  mx-auto">
                        <ul className="flex flex-col mx-auto md:grid grid-cols-10 text-gray-50">
                            {document?.tracking_steps.map((step, index) => (
                                <Tracking
                                    step={step.step_number}
                                    status={step.status}
                                    title={step.title}
                                    key={index}
                                    rejectReason={step.rejected_note}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                search && (
                    // Jika tidak ada data berkas yang ditemukan
                    <div className="p-10 mt-10 mx-auto border-t-2">
                        <div className="flex flex-col items-center">
                            <h1 className="text-2xl font-semibold text-center">
                                Informasi Berkas
                            </h1>
                            <p className="text-center text-gray-600 mt-2">
                                Berkas tidak ditemukan
                            </p>
                        </div>
                    </div>
                )
            )}
        </GuestLayout>
    );
}
