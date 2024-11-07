import React from "react";
import { Tooltip, Popconfirm, Empty } from "antd";

const TableArsip = ({ documents, user }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                No
                            </th>

                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                                Nama Berkas
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Nomor Berkas
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Jenis Berkas
                            </th>

                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Status
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Tanggal Selesai
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.data.length > 0 ? (
                            <>
                                {documents.data.map((data, key) => (
                                    <tr key={key}>
                                        <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white text-center">
                                                {documents.from + key}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.name}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.document_number}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.type}
                                            </p>
                                        </td>

                                        <td className="border-b border-[#eee] py-5 px-4 capitalize dark:border-strokedark">
                                            <span
                                                className={`bg-success text-white py-1 px-2 font-semibold rounded-full text-xs`}
                                            >
                                                <span className="text-white dark:text-white">
                                                    Selesai
                                                </span>
                                            </span>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {/* format nya hari bulan tangga */}
                                                {new Date(
                                                    data.updated_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-5 dark:border-strokedark"
                                >
                                    <Empty description="Berkas belum ada" />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableArsip;
