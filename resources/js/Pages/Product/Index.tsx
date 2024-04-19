import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Index({
    auth,
    products,
    success,
    error,
}: PageProps<{
    products: {
        data: any[];
        links: { url: string; label: string; active: boolean }[];
    };
    success: string;
    error: string;
}>) {
    const RP = (price: number) => {
        const result = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });
        return result.format(price);
    };

    const handleDelete = (id: string) => {
        if (confirm("Apakah anda yakin ingin menghapus data produk ini?")) {
            router.delete(route("product.destroy", id));
        } else {
            return;
        }
    };

    useEffect(() => {
        if (success) {
            toast.success(`${success}`, {
                duration: 2000,
            });
        }
        if (error) {
            toast.success(`${error}`, {
                duration: 2000,
            });
        }
    }, [success, error]);
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Product
                    </h2>
                    <Link
                        href={route("product.create")}
                        className="bg-indigo-600 text-gray-100 p-1 rounded-md hover:bg-indigo-800"
                    >
                        Tambah Produk
                    </Link>
                </div>
            }
        >
            <Head title="Product" />
            <Toaster position="top-center" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <Table>
                            {products &&
                                products.data.map((product, index) => (
                                    <tr key={product.id}>
                                        <td className="py-2 px-4 border-b ">
                                            {index + 1}
                                        </td>
                                        <td className="py-2 px-4 border-b text-nowrap">
                                            {product.name}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {RP(product.price)}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {RP(product.discount_price)}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex justify-center">
                                                <img
                                                    className="w-24 h-24 rounded-md"
                                                    src={product.image}
                                                    alt="product asr furniture"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <div className="flex gap-3 justify-center">
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        product.id
                                                    )}
                                                    className="bg-slate-700 py-2 px-4 rounded-md hover:bg-slate-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
                                                    }
                                                    className="bg-red-600 py-2 px-4 rounded-md hover:bg-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </Table>

                        <Pagination links={products.links} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
