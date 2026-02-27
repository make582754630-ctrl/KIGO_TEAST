'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 在实际应用中，这里应该从API获取产品数据
  const productId = params.id
  const productName = `Apple iPhone 15 Pro`
  
  return {
    title: `${productName} - Global Commerce`,
    description: `购买${productName}，享受全球配送服务`,
    keywords: `${productName}, 电子产品, 跨境电商, 全球配送`,
    openGraph: {
      title: `${productName} - Global Commerce`,
      description: `购买${productName}，享受全球配送服务`,
      images: [`https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=600&h=600&fit=crop`],
    },
  }
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)

  // 模拟商品数据
  const product = {
    id: Number(id),
    name: 'Apple iPhone 15 Pro',
    price: 999,
    description: 'iPhone 15 Pro 采用钛金属设计，搭载 A17 Pro 芯片，支持空间视频录制，拥有更强大的相机系统和更长的电池续航。',
    features: [
      '6.1 英寸 Super Retina XDR 显示屏',
      'A17 Pro 芯片',
      '钛金属机身',
      '空间视频录制',
      '4800 万像素主摄',
      'USB-C 接口',
    ],
    images: [
      'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=600&h=600&fit=crop',
    ],
    category: '电子产品',
    stock: 50,
    shipping: '全球配送',
    returnPolicy: '7天无理由退换',
  }

  const handleAddToCart = () => {
    // 这里可以实现添加到购物车的逻辑
    alert(`已添加 ${quantity} 件商品到购物车`)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative h-96 mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
                priority
                className="object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-24">
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="33.333vw"
                    quality={70}
                    loading="lazy"
                    className="object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{product.category}</div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-3xl font-bold text-primary mb-6">${product.price}</div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">商品描述</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">商品特性</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4">数量:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
              >
                加入购物车
              </button>
              <button className="btn btn-secondary flex-1">
                立即购买
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">库存:</span>
                <span className="ml-2">{product.stock} 件</span>
              </div>
              <div>
                <span className="font-semibold">配送:</span>
                <span className="ml-2">{product.shipping}</span>
              </div>
              <div>
                <span className="font-semibold">退换:</span>
                <span className="ml-2">{product.returnPolicy}</span>
              </div>
              <div>
                <span className="font-semibold">SKU:</span>
                <span className="ml-2">IP15PRO-{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage