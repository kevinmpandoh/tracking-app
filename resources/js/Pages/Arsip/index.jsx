import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import SearchInput from "@/Components/SearchInput";
import Pagination from "@/Components/Pagination";
import Table from "@/Pages/Arsip/TableArsip";
import Alert from "@/Components/Alert";

export default function Arsip({ auth, documents, search }) {
    const { flash } = usePage().props;

    const handleSearch = (query) => {
        router.get("/arsip", { search: query }, { replace: true });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Arsip Berkas" />

            <Breadcrumb pageName=" Arsip Berkas" />

            <div className="flex flex-row sm:justify-between mb-5">
                {flash.message && <Alert message={flash.message} />}
                <SearchInput
                    initialQuery={search}
                    handleSearch={handleSearch}
                />
            </div>

            <div className="flex flex-col gap-20">
                <Table documents={documents} user={auth.user} />

                <Pagination
                    links={documents.links}
                    currentPage={documents.current_page}
                    lastPage={documents.last_page}
                    from={documents.from}
                    to={documents.to}
                    total={documents.total}
                />
            </div>
        </AuthenticatedLayout>
    );
}
