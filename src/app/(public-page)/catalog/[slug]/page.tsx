import { CatalogDetailMain } from '@/components/catalog/detail/catalog-detail-main';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CatalogDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CatalogDetailMain slug={slug} />;
}
