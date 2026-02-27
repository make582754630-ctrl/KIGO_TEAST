import React, { useState } from 'react'
import { api } from '@/lib/api'

interface ShippingCalculatorProps {
  origin: string
  onShippingCalculated: (cost: number, estimatedDays: number) => void
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ origin, onShippingCalculated }) => {
  const [destination, setDestination] = useState('')
  const [weight, setWeight] = useState<number>(1)
  const [dimensions, setDimensions] = useState({
    length: 10,
    width: 10,
    height: 10,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ cost: number; estimatedDays: number } | null>(null)

  const countries = [
    { code: 'CN', name: 'China' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
  ]

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // 调用物流计算API
      const response = await api.shipping.calculate({
        origin,
        destination,
        weight,
        dimensions,
      })

      setResult(response)
      onShippingCalculated(response.cost, response.estimatedDays)
    } catch (err: any) {
      setError(err.message || '计算物流费用失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDimensionChange = (field: keyof typeof dimensions, value: number) => {
    setDimensions(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">国际物流计算</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            目的地国家/地区
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="input"
          >
            <option value="">请选择</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            重量 (kg)
          </label>
          <input
            type="number"
            id="weight"
            min="0.1"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            required
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            尺寸 (cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="length" className="block text-xs text-gray-500 mb-1">
                长度
              </label>
              <input
                type="number"
                id="length"
                min="1"
                value={dimensions.length}
                onChange={(e) => handleDimensionChange('length', parseFloat(e.target.value))}
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="width" className="block text-xs text-gray-500 mb-1">
                宽度
              </label>
              <input
                type="number"
                id="width"
                min="1"
                value={dimensions.width}
                onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value))}
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-xs text-gray-500 mb-1">
                高度
              </label>
              <input
                type="number"
                id="height"
                min="1"
                value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value))}
                required
                className="input"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          {isLoading ? '计算中...' : '计算物流费用'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h3 className="font-semibold mb-2">计算结果</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>物流费用:</span>
              <span className="font-bold">¥{result.cost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>预计送达时间:</span>
              <span>{result.estimatedDays} 天</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShippingCalculator