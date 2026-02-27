import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, LogOut, Globe } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/authContext'
import { useI18n } from '@/i18n/i18n'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout, isAuthenticated } = useAuth()
  const { locale, setLocale, t } = useI18n()

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale)
  }

  const categories = [
    { name: t('common.nav.electronics'), href: '/category/electronics' },
    { name: t('common.nav.clothing'), href: '/category/clothing' },
    { name: t('common.nav.home'), href: '/category/home' },
    { name: t('common.nav.beauty'), href: '/category/beauty' },
    { name: t('common.nav.sports'), href: '/category/sports' },
    { name: t('common.nav.food'), href: '/category/food' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Global Commerce</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder={t('common.search')}
                className="bg-transparent border-none outline-none w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-500" />
            </div>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 hidden group-hover:block">
                  <Link href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    我的账户
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    我的订单
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>退出登录</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
                <Globe className="h-6 w-6" />
                <span className="hidden md:inline">{locale === 'zh-CN' ? '中文' : 'English'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md py-2 z-50 hidden group-hover:block">
                <button
                  onClick={() => handleLanguageChange('zh-CN')}
                  className={`block w-full text-left px-4 py-2 ${locale === 'zh-CN' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  中文
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`block w-full text-left px-4 py-2 ${locale === 'en' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart" className="text-gray-700 hover:text-primary transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder={t('common.search')}
                className="bg-transparent border-none outline-none flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <nav className="flex flex-col space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header