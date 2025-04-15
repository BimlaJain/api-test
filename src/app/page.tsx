import Dashboard from '@/components/Dashboard'
import Program from '@/components/Program'
import React from 'react'

const page = () => {
  return (
    <div>
      <Dashboard universities={[]} />
      <Program/>
    </div>
  )
}

export default page
