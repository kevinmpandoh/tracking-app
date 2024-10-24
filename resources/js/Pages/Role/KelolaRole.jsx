import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import SearchInput from "@/Components/SearchInput";
import Pagination from "@/Components/Pagination";
import TableRole from "@/Pages/Role/TableRole";
import AddRoleForm from "./AddRoleForm";
import EditRoleForm from "./EditRoleForm";
import Alert from "@/Components/Alert";

const KelolaRole = ({ auth, role, search }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);

    const { flash, errors } = usePage().props;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const closeEditModal = () => setIsEditModalOpen(false);

    const openEditModal = (role) => {
        setCurrentRole(role);
        setIsEditModalOpen(true);
    };
    const handleDelete = (id) => {
        console.log(id);
        router.delete(`/role/${id}`).then(() => {
            // Refresh the page or handle post-delete actions here
        });
    };

    const handleSearch = (query) => {
        router.get("/role", { search: query }, { replace: true });
    };
    return (
        <Authenticated title="Role" user={auth.user}>
            {flash.success && <Alert tipe="success" pesan={flash.success} />}

            {errors && Object.keys(errors).length > 0 && (
                <Alert
                    tipe="error"
                    pesan="Terjadi kesalahan! Silahkan cek form."
                />
            )}

            <Head title="Kelola Role" />

            <Breadcrumb pageName="Kelola Role" />

            <div className="flex flex-row sm:justify-between mb-5">
                <SearchInput
                    initialQuery={search}
                    handleSearch={handleSearch}
                />

                <div>
                    <button
                        onClick={openModal}
                        className=" gap-2.5 rounded-md    inline-flex items-center justify-center bg-meta-3 py-2 px-5  text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 mr-4"
                    >
                        Tambah Role
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <TableRole
                    role={role}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                />

                <Pagination
                    links={role.links}
                    currentPage={role.current_page}
                    lastPage={role.last_page}
                    from={role.from}
                    to={role.to}
                    total={role.total}
                />
            </div>

            {/* Modal Form */}
            <AddRoleForm visible={isModalOpen} onCancel={closeModal} />
            <EditRoleForm
                visible={isEditModalOpen}
                onCancel={closeEditModal}
                role={currentRole}
            />
        </Authenticated>
    );
};

export default KelolaRole;
