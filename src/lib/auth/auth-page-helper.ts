import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from './auth';

export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return redirect('/login');
  }
  return session.user;
}

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return redirect('/login');
  }
  if (session.user.role !== 'admin') {
    return redirect('/dashboard');
  }
  return session.user;
}
