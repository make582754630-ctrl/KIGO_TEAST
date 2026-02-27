'use client'

import React, { useState } from 'react'
import ShippingCalculator from '@/components/ShippingCalculator'

const ShippingPage = () => {
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [estimatedDays, setEstimatedDays] = useState<number | null>(null)

  const handleShippingCalculated = (cost: number, days: number) => {
    setShippingCost(cost)
    setEstimatedDays(days)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">国际物流计算</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShippingCalculator
            origin="CN"
            onShippingCalculated={handleShippingCalculated}
          />
          
          {shippingCost !== null && estimatedDays !== null && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">物流费用估算</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">物流费用:</span>
                  <span className="text-2xl font-bold text-primary">¥{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">预计送达时间:</span>
                  <span>{estimatedDays} 天</span>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-500 text-sm">
                    * 以上费用为估算值，实际费用可能因包装、保险等因素有所不同
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    * 物流时间可能因海关清关等因素有所延迟
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShippingPage