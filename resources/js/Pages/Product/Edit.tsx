import Inputfile from "@/Components/Inputfile";
import Inputvalidation from "@/Components/Inputvalidation";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Edit = ({
    auth,
    product,
    success,
    error,
}: PageProps<{
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        discount_price: number;
        discount_tag: number;
        image: string;
    };
    error: string;
    success: string;
}>) => {
    const [previewImage, setPreviewImage] = useState<string>("");
    const { data, setData, post, processing, errors, reset } = useForm({
        id: product.id || "",
        nama_produk: product.name || "",
        harga_produk: product.price || 0,
        harga_diskon_produk: product.discount_price || "",
        diskon_produk: product.discount_tag,
        deskripsi_produk: product.description || "",
        gambar_produk: product.image || "",
    });

    const handlePreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (target.files && target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event && (event.target?.result as string));
            };
            reader.readAsDataURL(target.files[0]);
        }
    };

    useEffect(() => {
        const imageUrl = import.meta.env.VITE_APP_URL + "/" + product.image;
        const images = product.image;

        if (images.includes("https://")) {
            setPreviewImage(images);
        } else if (images.includes("storage/uploads/product")) {
            setPreviewImage(imageUrl + "/" + images);
        }
        if (success) {
            toast.success(`${success}`, {
                duration: 2000,
            });
        }

        if (error) {
            toast.error(`${error}`, {
                duration: 2000,
            });
        }
    }, [setPreviewImage, success, error]);

    const handleCountDiscount = (val: number) => {
        const beforeDiscount = data.harga_produk;
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

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("product.updates", product.id));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Produk
                    </h2>
                    <Link
                        href={route("product.index")}
                        className="bg-orange-600 text-gray-100 p-1 rounded-md hover:bg-orange-800"
                    >
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Edit Produk" />
            <Toaster position="top-center" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sn:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={handleSubmit}
                            method="POST"
                            className="text-gray-800 dark:text-gray-200 py-2 px-4"
                        >
                            <div className="grid grid-flow-col gap-5">
                                <Inputvalidation
                                    name="nama_produk"
                                    id="nama_produk"
                                    label="Nama Produk"
                                    type="text"
                                    value={data.nama_produk}
                                    onChanges={(e) =>
                                        setData("nama_produk", e.target.value)
                                    }
                                />
                                <Inputvalidation
                                    name="harga_produk"
                                    id="harga_produk"
                                    label="Harga Produk"
                                    type="number"
                                    value={data.harga_produk}
                                    onChanges={(e) =>
                                        setData("harga_produk", e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-flow-col gap-5">
                                <Inputvalidation
                                    name="diskon_produk"
                                    id="diskon_produk"
                                    label="Diskon Produk"
                                    type="number"
                                    value={data.diskon_produk}
                                    onChanges={(e) => {
                                        handleCountDiscount(e.target.value);
                                        setData((prevState) => ({
                                            ...prevState,
                                            diskon_produk: e.target.value,
                                        }));
                                    }}
                                />
                                <Inputvalidation
                                    name="harga_diskon_produk"
                                    id="harga_diskon_produk"
                                    label="Harga Diskon Produk"
                                    type="number"
                                    value={data.harga_diskon_produk}
                                    onChanges={(e) =>
                                        setData(
                                            "harga_diskon_produk",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                {product.image ? (
                                    <div className="flex justify-start items-center py-4">
                                        <img
                                            src={previewImage}
                                            alt="Preview Product Asr Furniture"
                                            className="rounded-lg h-32 w-32 "
                                        />
                                    </div>
                                ) : null}
                                <Inputfile
                                    label="Gambar Produk"
                                    labelInput="Upload Gambar"
                                    onChanges={(e) => {
                                        setData(
                                            "gambar_produk",
                                            e.target.files[0]
                                        );
                                        handlePreviewImage(e);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="deskripsi_produk">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    name="deskripsi_produk"
                                    className="bg-gray-800 text-gray-200 w-full h-24 rounded-md"
                                    value={data.deskripsi_produk}
                                    onChange={(e) =>
                                        setData(
                                            "deskripsi_produk",
                                            e.target.value
                                        )
                                    }
                                ></textarea>
                            </div>
                            <div className="mb-3 float-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`bg-green-600 text-gray-300 py-2 px-4 rounded-lg hover:bg-green-700 ${
                                        processing ? "bg-green-700" : ""
                                    }`}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Edit;
