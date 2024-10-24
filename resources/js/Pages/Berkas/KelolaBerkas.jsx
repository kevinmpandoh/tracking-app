import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import Breadcrumb from "@/Components/Breadcrumb";
import SearchInput from "@/Components/SearchInput";
import Pagination from "@/Components/Pagination";
import Table from "@/Pages/Berkas/TableBerkas";
import AddBerkasForm from "./AddBerkasForm";
import EditBerkasForm from "./EditBerkasForm";
import Alert from "@/Components/Alert";
import Swal from "sweetalert2";

export default function KelolaBerkas({ auth, documents, search }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);

    const handleStatusChange = (document) => {
        const documentId = document.id;
        if (auth.user.role === "Petugas Loket") {
            // Jika role adalah petugas_loket, tampilkan tombol Ajukan dan Batal
            Swal.fire({
                title: "Ajukan Dokumen",
                text: "Apakah Anda ingin mengajukan dokumen ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ajukan",
                cancelButtonText: "Batal",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Proses pengajuan untuk petugas loket
                    router.post(`/tracking-steps/${documentId}`, {
                        status: "completed",
                        title: "Dokumen telah diajukan",
                    });
                }
            });
        } else {
            // Jika role bukan petugas_loket, tampilkan tombol Setuju dan Tolak
            Swal.fire({
                title: "Ubah Status Dokumen",
                text: "Apakah Anda setuju atau ingin menolak dokumen ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Setuju",
                denyButtonText: "Tolak", // Tombol Tolak
                showDenyButton: true, // Menampilkan tombol Tolak
                cancelButtonText: "Batal",
                reverseButtons: true, // Membalik posisi tombol
            }).then((result) => {
                if (result.isConfirmed) {
                    // Proses persetujuan dokumen
                    router.post(`/tracking-steps/${documentId}`, {
                        status: "completed",
                        // disetujui oleh nama role
                        title: `Dokumen telah disetujui oleh ${auth.user.role}`,
                    });
                } else if (result.isDenied) {
                    // Jika menekan tombol Tolak, minta alasan penolakan
                    Swal.fire({
                        title: "Alasan Penolakan",
                        input: "textarea",
                        inputPlaceholder: "Masukkan alasan penolakan...",
                        inputAttributes: {
                            "aria-label": "Alasan Penolakan",
                        },
                        showCancelButton: true,
                        confirmButtonText: "Kirim Penolakan",
                        cancelButtonText: "Batal",
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.value) {
                            // Kirim alasan penolakan ke server
                            router.post(`/tracking-steps/${documentId}`, {
                                status: "rejected",
                                title: "Dokumen ditolak",
                                rejected_note: result.value, // Alasan dari pengguna
                            });
                        }
                    });
                }
            });
        }
    };

    const { flash, errors } = usePage().props;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const closeEditModal = () => setIsEditModalOpen(false);
    // const closeEditStatusModal = () => setIsEditStatusModalOpen(false);

    const openEditModal = (document) => {
        setCurrentDocument(document);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        router.delete(`/kelola-berkas/${id}`).then(() => {
            // Refresh the page or handle post-delete actions here
        });
    };

    const handleSearch = (query) => {
        router.get("/kelola-berkas", { search: query }, { replace: true });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Kelola Berkas" />

            <Breadcrumb pageName="Kelola Berkas" />

            <div className="flex flex-row sm:justify-between mb-5">
                {flash.message && <Alert message={flash.message} />}
                <SearchInput
                    initialQuery={search}
                    handleSearch={handleSearch}
                />

                {auth.user.role === "Admin" ||
                    (auth.user.role === "Petugas Loket" && (
                        <div>
                            <button
                                onClick={openModal}
                                className=" gap-2.5 rounded-md    inline-flex items-center justify-center bg-meta-3 py-2 px-5  text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 mr-4"
                            >
                                Tambah Dokumen
                            </button>
                        </div>
                    ))}
            </div>

            <div className="flex flex-col gap-20">
                <Table
                    documents={documents}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    onEditStatus={handleStatusChange}
                    user={auth.user}
                />

                <Pagination
                    links={documents.links}
                    currentPage={documents.current_page}
                    lastPage={documents.last_page}
                    from={documents.from}
                    to={documents.to}
                    total={documents.total}
                />
            </div>

            {/* Modal Form */}
            <AddBerkasForm visible={isModalOpen} onCancel={closeModal} />
            <EditBerkasForm
                visible={isEditModalOpen}
                onCancel={closeEditModal}
                document={currentDocument}
            />
        </AuthenticatedLayout>
    );
}
