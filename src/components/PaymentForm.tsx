// 支付表单组件
import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

interface PaymentFormProps {
  amount: number
  onSuccess: (paymentIntent: any) => void
  onError: (error: string) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 创建支付意图
      const response = await fetch('/api/payment/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }), // 转换为分
      })

      const { clientSecret } = await response.json()

      // 确认支付
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as any,
          billing_details: {
            name: 'Customer Name',
          },
        },
      })

      if (result.error) {
        setError(result.error.message || '支付失败')
        onError(result.error.message || '支付失败')
      } else {
        onSuccess(result.paymentIntent)
      }
    } catch (err: any) {
      setError(err.message || '支付过程中出现错误')
      onError(err.message || '支付过程中出现错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="border rounded-md p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: 'Inter, system-ui, sans-serif',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe}
        className="btn btn-primary w-full"
      >
        {isLoading ? '处理支付...' : `支付 ¥${amount}`}
      </button>
    </form>
  )
}

export default PaymentForm