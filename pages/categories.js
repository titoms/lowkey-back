import Layout from '@/components/Layout';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { categoryName, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setCategoryName('');
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category.categoryName);
    setParentCategory(category.parent?._id);
  };

  const deleteCategory = (category) => {};

  return (
    <Layout>
      <h1>Categories</h1>
      <label className="mb-2">
        {editedCategory
          ? `Edit Category ${editedCategory.categoryName}`
          : 'Create new Category'}
      </label>
      <form onSubmit={saveCategory} className=" mt-2 flex gap-1">
        <input
          className="mb-0"
          value={categoryName}
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder={'Category name'}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
                <td>{category?.parent?.categoryName}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
