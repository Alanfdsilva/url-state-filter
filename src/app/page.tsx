'use client'

import { useSearchParams, useRouter } from "next/navigation";
import Input from "./components/input";
import { products } from "./constants/product";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    id: "",
    product: "",
    price: "",
    category: "",
    rating: "",
    stock: "",
  });

  useEffect(() => {
    const newFilters = {
      id: params.get("id") || "",
      product: params.get("product") || "",
      price: params.get("price") || "",
      category: params.get("category") || "",
      rating: params.get("rating") || "",
      stock: params.get("stock") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);

  const clearFilter = () => {
    setFilters({
      id: "",
      product: "",
      price: "",
      category: "",
      rating: "",
      stock: "",
    })
  }

  const applyFilter = () => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`);

    const filtered = products.filter((product) => {
      return (
        (!filters.id || product.id.toLowerCase().includes(filters.id.toLowerCase())) &&
        (!filters.product || product.product.toLowerCase().includes(filters.product.toLowerCase())) &&
        (!filters.price || product.price.toString() === filters.price) &&
        (!filters.category || product.category.toLowerCase() === filters.category.toLowerCase()) &&
        (!filters.rating || product.rating.toString() === filters.rating) &&
        (!filters.stock || product.stock.toString() === filters.stock)
      );
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="p-8">
      <div className="flex flex-row gap-5 pb-4">
        <Input
          Label="Product Id"
          id="id"
          placeholder="Id"
          type="text"
          value={filters.id || ''}
          onChange={(e) => setFilters({ ...filters, id: e.target.value })}
        />
        <Input
          Label="Product Name"
          id="product"
          placeholder="Product"
          type="text"
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
        />
        <Input
          Label="Price"
          id="price"
          placeholder="0.00"
          type="number"
          value={filters.price || ''}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
        <Input
          Label="Category"
          id="category"
          placeholder="Category"
          type="text"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <Input
          Label="Rate"
          id="rating"
          placeholder="0.0"
          type="number"
          value={filters.rating || ''}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
        <Input
          Label="Quantity in Stock"
          id="stock"
          placeholder="0"
          type="number"
          value={filters.stock || ''}
          onChange={(e) => setFilters({ ...filters, stock: e.target.value })}
        />
        <button onClick={applyFilter} className="px-4 py-2 bg-blue-500 mt-5 hover:bg-blue-600 text-white rounded">Filtrar</button>
        <button onClick={clearFilter} className="px-4 py-2 bg-blue-500 mt-5 hover:bg-blue-600 text-white rounded">Clear Filter</button>
      </div>

      <table className="table-auto w-full border-solid border-2">
        <thead>
          <tr className="text-left border-solid border-2 bg-slate-100">
            <th className="px-4 border-solid border-2">Id</th>
            <th className="px-4 border-solid border-2">Product</th>
            <th className="px-4 border-solid border-2">Price</th>
            <th className="px-4 border-solid border-2">Category</th>
            <th className="px-4 border-solid border-2">Rating</th>
            <th className="px-4 border-solid border-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-4 border-solid border-2">{product.id}</td>
              <td className="px-4 border-solid border-2">{product.product}</td>
              <td className="px-4 border-solid border-2">{product.price}</td>
              <td className="px-4 border-solid border-2">{product.category}</td>
              <td className="px-4 border-solid border-2">{product.rating}</td>
              <td className="px-4 border-solid border-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
