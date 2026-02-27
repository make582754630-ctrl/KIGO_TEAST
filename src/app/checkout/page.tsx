'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const CheckoutPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  const orderId = searchParams.get('orderId') || ''

  const handlePayment = () => {
    // 模拟支付成功
    router.push(`/checkout/success?orderId=${orderId}&paymentId=test_payment_id`)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">结账</h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">订单信息</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>订单金额</span>
                <span className="font-semibold">¥{amount}</span>
              </div>
              {orderId && (
                <div className="flex justify-between">
                  <span>订单号</span>
                  <span>{orderId}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">支付方式</h2>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="credit-card" name="payment-method" defaultChecked />
                  <label htmlFor="credit-card">信用卡</label>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="paypal" name="payment-method" />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              <button
                onClick={handlePayment}
                className="btn btn-primary w-full"
              >
                支付 ¥{amount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage