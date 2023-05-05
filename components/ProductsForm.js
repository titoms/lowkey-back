import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

export default function ProductsForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  productImages: currentImages,
  category: currentCategory,
}) {
  const [title, setTitle] = useState(currentTitle || '');
  const [description, setDescription] = useState(currentDescription || '');
  const [price, setPrice] = useState(currentPrice || '');
  const [category, setCategory] = useState(currentCategory || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [productImages, setProductImages] = useState(currentImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, productImages, category };
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setProductImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(productImages) {
    setProductImages(productImages);
  }

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Product name :</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        className="mb-0 p-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Category :</label>
      <select
        type="text"
        placeholder="Product Name"
        value={category}
        className="mb-0 p-2"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option value={category._id}>{category.categoryName}</option>
          ))}
      </select>
      <label htmlFor="">Photos :</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={productImages}
          setList={updateImagesOrder}
        >
          {!!productImages?.length &&
            productImages.map((link) => (
              <div key={link} className="h-24">
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex items-center">
            <Spinner />
          </div>
        )}
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
      </div>
      <label htmlFor="">Product description :</label>
      <textarea
        placeholder="Description"
        value={description}
        className="pt-2"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="">Product price (in EUR):</label>
      <input
        type="number"
        placeholder="Price"
        className="mb-0 p-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}
