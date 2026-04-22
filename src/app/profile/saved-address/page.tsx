import { SavedAddressMain } from '@/components/profile/saved-address/saved-address-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function SavedAddressPage() {
  await requireUser();

  return <SavedAddressMain />;
}
