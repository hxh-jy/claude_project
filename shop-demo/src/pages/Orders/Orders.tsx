import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice, formatDate } from '@/utils/helpers'
import { ROUTES } from '@/routes'

const Orders: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      total: 129.99,
      status: 'delivered',
      itemCount: 3,
    },
    {
      id: 'ORD-002',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      total: 249.99,
      status: 'shipped',
      itemCount: 2,
    },
  ])

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to View Orders</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to view your orders</p>
        <button
          onClick={() => navigate(ROUTES.login)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet</p>
        <button
          onClick={() => navigate(ROUTES.home)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Hello, {user?.username}!</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Order ID */}
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{order.id}</p>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatDate(order.date)}
                </p>
              </div>

              {/* Amount */}
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(order.total)}
                </p>
              </div>

              {/* Status & Button */}
              <div className="flex flex-col justify-between items-end">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusLabel(order.status)}
                </span>
                <button className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">{order.itemCount} items</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(ROUTES.home)}
        className="px-6 py-3 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
      >
        Continue Shopping
      </button>
    </div>
  )
}

export default Orders
