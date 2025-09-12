import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-gray-900'>
                Our Pricing Plans
            </h2>
            <p>
                Choose the plan that fits your needs.
            </p>
        </div>
        <div className='mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <PricingTable />
        </div>
    </div>
  )
}

export default Plan