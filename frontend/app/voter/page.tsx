import Dashboard from '@/components/voter/Bashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'

const VoterPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default VoterPage
