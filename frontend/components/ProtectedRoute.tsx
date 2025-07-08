"use client";
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { authApi } from '@/lib/api';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/voter');
        return;
      }

      try {
        // You can add a token validation API call here if needed
        // await authApi.validateToken();
      } catch (error) {
        authApi.logout();
        router.push('/voter');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
