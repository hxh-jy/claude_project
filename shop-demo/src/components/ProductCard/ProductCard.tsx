import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/types/product'
import { ROUTES } from '@/routes'
import { formatPrice } from '@/utils/helpers'
import { useCart } from '@/hooks/useCart'
import styles from './ProductCard.module.css'

export interface ProductCardProps {
  product: Product
}

const ProductCard = React.memo<ProductCardProps>(({ product }) => {
  const { add } = useCart()

  const handleAddToCart = useCallback(() => {
    add(product, 1)
  }, [product, add])

  const inStock = product.stock > 0

  return (
    <div className={styles.card}>
      <Link to={ROUTES.product(product.id)} className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/300x300?text=Product'
          }}
        />
      </Link>

      <div className={styles.content}>
        <Link to={ROUTES.product(product.id)} className={styles.title}>
          {product.name}
        </Link>

        <p className={styles.category}>{product.category}</p>

        <div className={styles.rating}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.reviewCount}>({product.reviewCount})</span>
        </div>

        <div className={styles.price}>{formatPrice(product.price)}</div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`${styles.button} ${!inStock ? styles.buttonDisabled : ''}`}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
