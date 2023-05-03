import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function ProductsForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  productImages,
}) {
  const [title, setTitle] = useState(currentTitle || '');
  const [description, setDescription] = useState(currentDescription || '');
  const [price, setPrice] = useState(currentPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      //update data
      await axios.put('/api/products', { ...data, _id });
    } else {
      //create data
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  };
  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      console.log(res);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Product name :</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Photos :</label>
      <div className="mb-2">
        <label
          className="w-24 h-24 cursor-pointer bg-gray-600 rounded-md
         text-sm gap-1 text-white
         text-center flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
        {!productImages?.length && <div>No images in this product</div>}
      </div>
      <label htmlFor="">Product description :</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="">Product price (in EUR):</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
