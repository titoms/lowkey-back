import Layout from '@/components/Layout';
import ProductsForm from '@/components/ProductsForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function EditProductPage() {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product {id}</h1>
      {productData && <ProductsForm {...productData} />}
    </Layout>
  );
}
