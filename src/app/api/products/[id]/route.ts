import { withApiAdmin } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { updateProductSchema } from '@/schemas/product.schema';
import { productService } from '@/services/product.service';

export const GET = withApiAdmin<{ id: string }>(async ({ params }) => {
  const product = await productService.getProductDetail(params.id);
  return jsend.success(product);
});

export const PUT = withApiAdmin<{ id: string }>(async ({ req, params }) => {
  const body = await req.json();
  const data = updateProductSchema.parse(body);
  const product = await productService.updateProduct(params.id, data);
  return jsend.success(product);
});

export const DELETE = withApiAdmin<{ id: string }>(async ({ params }) => {
  await productService.deleteProduct(params.id);
  return jsend.success(null);
});
