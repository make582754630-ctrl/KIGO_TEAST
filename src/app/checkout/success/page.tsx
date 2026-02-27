import { useSearchParams } from 'next/navigation'

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const paymentId = searchParams.get('paymentId') || ''

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4">支付成功！</h1>
          <p className="text-gray-600 mb-6">您的订单已成功支付，感谢您的购买。</p>
          
          {orderId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">订单号: <span className="font-semibold">{orderId}</span></p>
              {paymentId && (
                <p className="text-sm text-gray-600">支付ID: <span className="font-semibold">{paymentId}</span></p>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <a href="/" className="btn btn-primary block">
              返回首页
            </a>
            <a href="/orders" className="btn w-full border border-gray-300 hover:bg-gray-100">
              查看订单
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage