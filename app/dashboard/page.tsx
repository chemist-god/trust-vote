//import Dashboard from '@/components/Dashboard'
import Bashboard from '@/components/Bashboard'
import React from 'react'

export default function DashboardPage({ searchParams }: { searchParams: { studentId?: string } }) {
  const studentId = searchParams.studentId || 'Unknown‑ID';
  return <Bashboard studentId={studentId} />;
}

