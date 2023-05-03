import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function ProductsForm({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
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

  return (
    <form onSubmit={saveProduct}>
      <label htmlFor="">Product name :</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
