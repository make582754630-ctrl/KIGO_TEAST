'use client'

import Link from 'next/link'
import Image from 'next/image'

const HomePage = () => {
  // 模拟商品数据
  const featuredProducts = [
    {
      id: 1,
      name: 'Apple iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592845348494-00c4b1b8a9d0?w=300&h=300&fit=crop',
      category: '电子产品',
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      price: 150,
      image: 'https://images.unsplash.com/photo-1607522371523-3149eb1df144?w=300&h=300&fit=crop',
      category: '服装鞋包',
    },
    {
      id: 3,
      name: 'Dyson V15 Vacuum',
      price: 599,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop',
      category: '家居用品',
    },
    {
      id: 4,
      name: 'SK-II Facial Treatment Essence',
      price: 189,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      category: '美妆护肤',
    },
  ]

  const categories = [
    {
      name: '电子产品',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop',
      href: '/category/electronics',
    },
    {
      name: '服装鞋包',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=200&fit=crop',
      href: '/category/clothing',
    },
    {
      name: '家居用品',
      image: 'https://images.unsplash.com/photo-1581578731548-c6469676c115?w=400&h=200&fit=crop',
      href: '/category/home',
    },
    {
      name: '美妆护肤',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=200&fit=crop',
      href: '/category/beauty',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1607083206968-164f33304e21?w=1920&h=600&fit=crop"
          alt="Global Commerce"
          fill
          sizes="100vw"
          quality={80}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                全球好物，尽在 Global Commerce
              </h1>
              <p className="text-xl mb-8">
                一站式跨境电商购物平台，提供全类目商品和全球配送服务
              </p>
              <Link href="/category" className="btn btn-primary text-lg">
                立即购物
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">热门分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">推荐商品</h2>
            <Link href="/category" className="text-primary hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="block">
                <div className="card">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      quality={75}
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="text-primary font-bold">${product.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl text-primary mb-4">🌍</div>
              <h3 className="text-lg font-semibold mb-2">全球配送</h3>
              <p className="text-gray-600">覆盖全球200+国家和地区</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-2">安全支付</h3>
              <p className="text-gray-600">多种支付方式，保障交易安全</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary mb-4">🔒</div>
              <h3 className="text-lg font-semibold mb-2">品质保证</h3>
              <p className="text-gray-600">正品保障，7天无理由退换</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage