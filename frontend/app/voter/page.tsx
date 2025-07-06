import SignIn from '@/components/SignIn'
import React from 'react'

const page = () => {
  return (
    <div>
        <SignIn/>
    </div>
  )
}

export default page

// import { withRoleProtection } from '@/lib/authHelpers';

// function VoterDashboard() {
//   return <div>Welcome to the Voter Dashboard</div>;
// }

// export default withRoleProtection(VoterDashboard, ['voter']);