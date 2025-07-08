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

// import { withRoleProtection } from '@/lib/authHelpers';

// function VoterDashboard() {
//   return <div>Welcome to the Voter Dashboard</div>;
// }

// export default withRoleProtection(VoterDashboard, ['voter']);