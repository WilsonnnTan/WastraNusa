import { withApiAdmin } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { createProductSchema } from '@/schemas/product.schema';
import { productService } from '@/services/product.service';

export const GET = withApiAdmin(async ({ req }) => {
  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 10);

  const products = await productService.getProducts(page, limit);
  return jsend.success(products);
});

export const POST = withApiAdmin(async ({ req }) => {
  const body = await req.json();
  const data = createProductSchema.parse(body);
  const product = await productService.createProduct(data);
  return jsend.success(product, 201);
});
