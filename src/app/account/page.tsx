import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'

const AccountPage = () => {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/auth/login')
    return null
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">我的账户</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">个人信息</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">账户设置</h2>
            
            <div className="space-y-2">
              <a href="#" className="block py-2 px-4 hover:bg-gray-50 rounded">
                修改密码
              </a>
              <a href="#" className="block py-2 px-4 hover:bg-gray-50 rounded">
                地址管理
              </a>
              <a href="/orders" className="block py-2 px-4 hover:bg-gray-50 rounded">
                查看订单
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage