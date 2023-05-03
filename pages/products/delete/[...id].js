import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productData, setProductData] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Are you sure you want to delete product &nbsp;
        <b>"{productData?.title}"</b> ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
