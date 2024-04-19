<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Product/Index", [
            'products' => Product::paginate(10),
            'success' => session("success"),
            'error' => session("error")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Product/Create", [
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => ['required'],
            'harga_produk' => 'required',
            'harga_diskon_produk' => 'required',
            'diskon_produk' => 'required',
            'deskripsi_produk' => 'required',
            'gambar_produk' => ['required', File::image()->min('1kb')
                ->max('10mb')],
        ], [
            'required' => ':attribute wajib di isi!'
        ]);
        $data = [
            'id' => Uuid::uuid4()->toString(),
            'name' => $request->nama_produk,
            'description' => $request->deskripsi_produk,
            'price' => $request->harga_produk,
            'discount_price' => $request->harga_diskon_produk,
            'discount_tag' => $request->diskon_produk,
        ];
        if ($request->hasFile('gambar_produk')) {
            $image = $request->file('gambar_produk');
            $name = random_int(10, 99999999) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/uploads/product'), $name);
            $data['image'] = 'storage/uploads/product/' . $name;
        }
        try {
            Product::create($data);

            return to_route('product.create')->with('success', 'Berhasil Menambahkan Produk');
        } catch (\Exception $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render("Product/Edit", [
            'product' => Product::find($id),
            'success' => session("success"),
            'error' => session('error')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        $dataUpdate = [
            'name' => $request->nama_produk,
            'description' => $request->deskripsi_produk,
            'price' => $request->harga_produk,
            'discount_tag' => $request->diskon_produk,
            'discount_price' => $request->harga_diskon_produk,
            'image' => $request->gambar_produk
        ];

        if ($request->hasFile('gambar_produk')) {
            if (FacadesFile::exists($product->image)) {
                unlink($product->image);
            }
            $image = $request->file('gambar_produk');
            $name = random_int(10, 99999999) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/uploads/product'), $name);
            $dataUpdate['image'] = 'storage/uploads/product/' . $name;
        }

        try {
            Product::where('id', $id)->update($dataUpdate);

            return to_route('product.show', $product->id)->with('success', 'Berhasil Update Data Produk');
        } catch (\Exception $th) {
            return to_route('product.show', $product->id)->with('error', 'Gagal Update Data Produk');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if ($product) {
            if (FacadesFile::exists($product->image)) {
                unlink($product->image);
            }

            try {
                Product::where('id', $id)->delete();
                return to_route('product.index')->with('success', "Produk berhasil di hapus!");
            } catch (\Exception $th) {
                return to_route('product.index')->with('error', "Produk gagal di hapus!");
            }
        } else {
            return to_route('product.index')->with('error', 'Produk tidak ditemukan');
        }
    }
}
