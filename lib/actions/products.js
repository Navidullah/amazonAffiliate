// /lib/actions/products.js
import { ConnectToDB } from "@/lib/db";
import DigitalProduct from "@/lib/models/DigitalProduct";

const normalize = (doc) => JSON.parse(JSON.stringify(doc));

/** Fetch all active digital products for the storefront homepage. */
export const getActiveDigitalProducts = async () => {
  await ConnectToDB();
  const products = await DigitalProduct.find({ active: true })
    .sort({ createdAt: 1 })
    .lean();
  return normalize(products);
};

/** Fetch active digital products for one curriculum (used by /books/[curriculum]
 *  landing pages, which show both free-to-read books and paid worked-solution
 *  products for the same curriculum — joined on gradeLevel === Book.curriculum). */
export const getActiveDigitalProductsByGradeLevel = async (gradeLevel) => {
  await ConnectToDB();
  const products = await DigitalProduct.find({ active: true, gradeLevel })
    .sort({ createdAt: 1 })
    .lean();
  return normalize(products);
};

/** Fetch a single active product by slug (never includes downloadUrl). */
export const getProductBySlug = async (slug) => {
  await ConnectToDB();
  const product = await DigitalProduct.findOne({ slug, active: true }).lean();
  return product ? normalize(product) : null;
};
