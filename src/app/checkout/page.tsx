import { useRouter, useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '@/components/PaymentForm'

// 加载Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key')

const CheckoutPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  const orderId = searchParams.get('orderId') || ''

  const handlePaymentSuccess = (paymentIntent: any) => {
    // 支付成功，跳转到成功页面
    router.push(`/checkout/success?orderId=${orderId}&paymentId=${paymentIntent.id}`)
  }

  const handlePaymentError = (error: string) => {
    console.error('支付失败:', error)
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
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={parseFloat(amount)}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage