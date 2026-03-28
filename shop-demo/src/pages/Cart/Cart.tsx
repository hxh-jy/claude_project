import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/helpers'
import { ROUTES } from '@/routes'

const Cart: React.FC = () => {
  const { items, total, update, remove, isEmpty } = useCart()

  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h5M17 13v8m-4-8v8"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link
          to={ROUTES.home}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/100x100?text=Product'
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  to={ROUTES.product(item.id)}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{item.category}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {formatPrice(item.price)}
                </p>
              </div>

              {/* Quantity and Remove */}
              <div className="flex flex-col items-end justify-between">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => update(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => update(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => remove(item.id)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right whitespace-nowrap">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatPrice(0)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Link
            to={ROUTES.checkout}
            className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </Link>

          <Link
            to={ROUTES.home}
            className="w-full block text-center mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
