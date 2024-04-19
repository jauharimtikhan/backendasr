import Inputfile from "@/Components/Inputfile";
import Inputvalidation from "@/Components/Inputvalidation";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Create = ({ auth, success }: PageProps) => {
    const { data, setData, post, processing, errors } = useForm({
        nama_produk: "",
        harga_produk: "",
        gambar_produk: "",
        harga_diskon_produk: "",
        deskripsi_produk: "",
        diskon_produk: 0,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("product.store"));
    };

    useEffect(() => {
        if (success) {
            toast.success(`${success}`, {
                duration: 2000,
            });
        }
    }, [success]);

    const handleCountDiscount = (val: number) => {
        const beforeDiscount = parseInt(data.harga_produk);
        if (!isNaN(beforeDiscount)) {
            const discount = (Number(beforeDiscount) * Number(val)) / 100;
            const afterDiscount = beforeDiscount - discount;
            setData("diskon_produk", Number(val));
            setData("harga_diskon_produk", String(afterDiscount));
        } else {
            setData("diskon_produk", Number(val));
            setData("harga_diskon_produk", "");
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Tambah Produk
                    </h2>
                    <Link
                        href={route("product.index")}
                        className="bg-orange-600 text-gray-100 py-2 px-4 rounded-md hover:bg-orange-800"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Produk" />
            <Toaster position="top-center" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            method="POST"
                            onSubmit={handleSubmit}
                            className="text-gray-800 dark:text-gray-100 py-2 px-4"
                        >
                            <div className="grid grid-flow-col gap-5">
                                <Inputvalidation
                                    id="nama_produk"
                                    name="nama_produk"
                                    label="Nama Produk"
                                    type="text"
                                    value={data.nama_produk}
                                    onChanges={(e) =>
                                        setData("nama_produk", e.target.value)
                                    }
                                    error={errors && errors.nama_produk}
                                />
                                <Inputvalidation
                                    id="harga_produk"
                                    name="harga_produk"
                                    label="Harga Produk"
                                    type="number"
                                    value={data.harga_produk}
                                    onChanges={(e) =>
                                        setData("harga_produk", e.target.value)
                                    }
                                    error={errors && errors.harga_produk}
                                />
                            </div>
                            <div className="grid grid-flow-col gap-5">
                                <Inputvalidation
                                    id="diskon_produk"
                                    name="diskon_produk"
                                    label="Diskon Produk (%)"
                                    type="number"
                                    value={data.diskon_produk.toString()}
                                    onChanges={(e) => {
                                        handleCountDiscount(e.target.value);
                                        setData((prevState) => ({
                                            ...prevState,
                                            diskon_produk: e.target.value,
                                        }));
                                    }}
                                    error={errors && errors.diskon_produk}
                                />
                                <Inputvalidation
                                    id="harga_diskon_produk"
                                    name="harga_diskon_produk"
                                    label="Harga Diskon Produk"
                                    type="number"
                                    value={data.harga_diskon_produk}
                                    onChanges={(e) =>
                                        setData(
                                            "harga_diskon_produk",
                                            e.target.value
                                        )
                                    }
                                    error={errors && errors.harga_diskon_produk}
                                />
                            </div>
                            <div className="mb-3">
                                <Inputfile
                                    label="Gambar Produk"
                                    labelInput="Upload Gambar"
                                    onChanges={(e) => {
                                        setData(
                                            "gambar_produk",
                                            e.target.files[0]
                                        );
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="deskripsi_produk">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    name="deskripsi_produk"
                                    className="bg-gray-700 border-none text-gray-200 w-full h-24 rounded-md"
                                    value={data.deskripsi_produk}
                                    onChange={(e) =>
                                        setData(
                                            "deskripsi_produk",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                                <span className="text-red-600">
                                    {errors && errors.deskripsi_produk}
                                </span>
                            </div>
                            <div className="mb-3 float-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`bg-green-600 text-gray-300 py-2 px-4 rounded-lg hover:bg-green-700 ${
                                        processing ? "bg-green-700" : ""
                                    }`}
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
