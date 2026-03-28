import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '@/types/product'
import { productService } from '@/services/productService'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/helpers'
import { ROUTES } from '@/routes'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { add } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load product'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      add(product, quantity)
      alert('Product added to cart!')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 font-medium">{error || 'Product not found'}</p>
        <button
          onClick={() => navigate(ROUTES.home)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const inStock = product.stock > 0

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(ROUTES.home)}
        className="text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/500x500?text=Product'
            }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.category}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <span className="text-gray-600">({product.reviewCount} reviews)</span>
          </div>

          <div className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-900">
              Stock Available: <span className={inStock ? 'text-green-600' : 'text-red-600'}>
                {inStock ? `${product.stock} items` : 'Out of Stock'}
              </span>
            </p>
          </div>

          {inStock && (
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r border-gray-300 py-2"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`w-full py-3 rounded-lg font-bold text-lg transition ${
              inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
