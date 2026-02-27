'use client'

import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'

const OrdersPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/auth/login')
    return null
  }

  // 模拟订单数据
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-02-20',
      total: 1149,
      status: '已发货',
      items: 2,
    },
    {
      id: 'ORD-002',
      date: '2024-02-15',
      total: 599,
      status: '已完成',
      items: 1,
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">我的订单</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">您还没有订单</p>
            <a href="/" className="btn btn-primary mt-4">去购物</a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">订单号: {order.id}</h3>
                    <p className="text-gray-500 text-sm">下单日期: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">¥{order.total}</p>
                    <p className={`text-sm ${order.status === '已完成' ? 'text-green-600' : 'text-blue-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-gray-600">共 {order.items} 件商品</p>
                  <a href={`/order/${order.id}`} className="text-primary hover:underline">
                    查看详情
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage