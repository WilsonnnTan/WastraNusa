import { EncyclopediaDetailMain } from '@/components/encyclopedia/encyclopedia-detail-main';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EncyclopediaDetailPage({ params }: Props) {
  const { slug } = await params;

  return <EncyclopediaDetailMain slug={slug} />;
}
