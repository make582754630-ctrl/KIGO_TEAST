'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '商品分类 - Global Commerce',
  description: '浏览我们的全类目商品，包括电子产品、服装鞋包、家居用品、美妆护肤等',
  keywords: '跨境电商, 商品分类, 电子产品, 服装鞋包, 家居用品, 美妆护肤',
}

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 模拟商品数据
  const products = [
    {
      id: 1,
      name: 'Apple iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=300&h=300&fit=crop',
      category: 'electronics',
      categoryName: '电子产品',
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      price: 150,
      image: 'https://images.unsplash.com/photo-1607522371523-3149eb1df144?w=300&h=300&fit=crop',
      category: 'clothing',
      categoryName: '服装鞋包',
    },
    {
      id: 3,
      name: 'Dyson V15 Vacuum',
      price: 599,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop',
      category: 'home',
      categoryName: '家居用品',
    },
    {
      id: 4,
      name: 'SK-II Facial Treatment Essence',
      price: 189,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      category: 'beauty',
      categoryName: '美妆护肤',
    },
    {
      id: 5,
      name: 'Samsung Galaxy S24 Ultra',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=300&h=300&fit=crop',
      category: 'electronics',
      categoryName: '电子产品',
    },
    {
      id: 6,
      name: 'Adidas Ultraboost',
      price: 180,
      image: 'https://images.unsplash.com/photo-1607522371523-3149eb1df144?w=300&h=300&fit=crop',
      category: 'clothing',
      categoryName: '服装鞋包',
    },
  ]

  const categories = [
    { id: 'all', name: '全部商品' },
    { id: 'electronics', name: '电子产品' },
    { id: 'clothing', name: '服装鞋包' },
    { id: 'home', name: '家居用品' },
    { id: 'beauty', name: '美妆护肤' },
    { id: 'sports', name: '运动户外' },
    { id: 'food', name: '食品饮料' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">商品分类</h1>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block">
              <div className="card">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="text-primary font-bold">${product.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">该分类暂无商品</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage