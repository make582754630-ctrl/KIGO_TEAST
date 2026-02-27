import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Global Commerce</h3>
            <p className="text-gray-400 mb-4">
              一站式跨境电商购物平台，提供全类目商品和全球配送服务。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">商品分类</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/electronics" className="text-gray-400 hover:text-white transition-colors">
                  电子产品
                </Link>
              </li>
              <li>
                <Link href="/category/clothing" className="text-gray-400 hover:text-white transition-colors">
                  服装鞋包
                </Link>
              </li>
              <li>
                <Link href="/category/home" className="text-gray-400 hover:text-white transition-colors">
                  家居用品
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="text-gray-400 hover:text-white transition-colors">
                  美妆护肤
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-gray-400 hover:text-white transition-colors">
                  运动户外
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-gray-400">
              <li>邮箱: info@globalcommerce.com</li>
              <li>电话: +86 123 4567 8910</li>
              <li>地址: 上海市浦东新区张江高科技园区</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Global Commerce. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer