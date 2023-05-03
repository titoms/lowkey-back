import { Category } from '@/models/Category';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
  }

  if (method === 'POST') {
    const { categoryName, parentCategory } = req.body;
    const categoryData = await Category.create({
      categoryName,
      parent: parentCategory,
    });
    res.json(categoryData);
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
}
