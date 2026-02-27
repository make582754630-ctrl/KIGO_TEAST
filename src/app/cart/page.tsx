'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '购物车 - Global Commerce',
  description: '查看和管理您的购物车，准备结算您的订单',
  keywords: '购物车, 订单管理, 结算, 跨境电商',
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple iPhone 15 Pro',
      price: 999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      price: 150,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1607522371523-3149eb1df144?w=100&h=100&fit=crop',
    },
  ])

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">购物车</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">购物车为空</p>
            <a href="/" className="btn btn-primary">去购物</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div className="flex border-b py-4">
                  <div className="relative h-24 w-24 mr-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="24px"
                      quality={70}
                      loading="lazy"
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-4">${item.price * item.quantity}</span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-danger hover:underline"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">订单摘要</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>商品小计</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>运费</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>总计</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn btn-primary w-full mb-4">
                结算
              </button>
              <button className="btn w-full border border-gray-300 hover:bg-gray-100">
                继续购物
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage