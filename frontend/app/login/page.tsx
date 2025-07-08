import SignIn from '@/components/SignIn';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login - TrustVote',
  description: 'Sign in with your studentID and your indexNumber as default password',
};

export default async function LoginPage() {
  // Check if user is already authenticated
  const cookiesList = await cookies();
  const token = cookiesList.get('token')?.value;
  if (token) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SignIn />
    </div>
  );
}
