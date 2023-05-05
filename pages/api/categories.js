import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { categoryName, parentCategory } = req.body;
    if (parentCategory) {
      const data = {
        categoryName,
        parent: parentCategory,
      };
      const categoryData = await Category.create(data);
      res.json(categoryData);
    } else {
      const data = {
        categoryName,
      };
      const categoryData = await Category.create(data);
      res.json(categoryData);
    }
  }

  if (method === 'PUT') {
    const { categoryName, parentCategory, _id } = req.body;
    const categoryData = await Category.updateOne(
      { _id },
      {
        categoryName,
        parent: parentCategory,
      }
    );
    res.json(categoryData);
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json('Deleted category');
  }
}
