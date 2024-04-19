import React, { PropsWithChildren } from "react";

const Table = ({ children }: PropsWithChildren) => {
    return (
        <div className="overflow-x-scroll scrollbar-thumb-gray-700 and scrollbar-track-gray-100">
            <table className="table-auto min-w-full ">
                <thead className="text-gray-800 dark:text-gray-100">
                    <tr className="border-collapse border-spacing-0 border-b ">
                        <th className="py-2 px-4">No</th>
                        <th className="py-2 px-4">Nama</th>
                        <th className="py-2 px-4">Harga</th>
                        <th className="py-2 px-4">Harga Diskon</th>
                        <th className="py-2 px-4">Image</th>
                        <th className="py-2 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 dark:text-gray-100 text-center">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
