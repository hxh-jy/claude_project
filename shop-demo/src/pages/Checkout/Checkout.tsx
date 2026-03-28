import { useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/utils/helpers'
import { ROUTES } from '@/routes'

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { items, total, clear } = useCart()
  const { user } = useAuth()

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate(ROUTES.home)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Shopping
        </button>
      </div>
    )
  }

  const handlePlaceOrder = () => {
    // Simulate order creation
    alert('Order placed successfully!')
    clear()
    navigate(ROUTES.orders)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

      {/* Shipping Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
        {user ? (
          <p className="text-gray-700">{user.email}</p>
        ) : (
          <p className="text-gray-600">Please log in to continue</p>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between pb-4 border-b">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center p-3 border-2 border-blue-600 rounded-lg cursor-pointer">
            <input type="radio" name="payment" defaultChecked className="mr-3" />
            <span className="text-gray-900 font-medium">Credit Card</span>
          </label>
          <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer">
            <input type="radio" name="payment" className="mr-3" />
            <span className="text-gray-900 font-medium">PayPal</span>
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900 font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900 font-medium">{formatPrice(0)}</span>
          </div>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(ROUTES.cart)}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50"
        >
          Back to Cart
        </button>
        <button
          onClick={handlePlaceOrder}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Checkout
