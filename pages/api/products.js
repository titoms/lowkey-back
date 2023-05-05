import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
    res.json(await Product.find());
  }

  if (method === 'POST') {
    const { title, description, price, productImages, category } = req.body;
    const productData = await Product.create({
      title,
      description,
      price,
      productImages,
      category,
    });
    res.json(productData);
  }

  if (method === 'PUT') {
    const { title, description, price, productImages, category, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, productImages, category }
    );
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
