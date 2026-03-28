import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addItem, removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'

/**
 * 管理购物车相关的逻辑
 */
export const useCart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = useAppSelector((state) => state.cart.total)

  const add = useCallback(
    (product: Product, quantity: number = 1) => {
      const cartItem: CartItem = {
        ...product,
        quantity,
      }
      dispatch(addItem(cartItem))
    },
    [dispatch]
  )

  const remove = useCallback(
    (id: string) => {
      dispatch(removeItem(id))
    },
    [dispatch]
  )

  const update = useCallback(
    (id: string, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }))
    },
    [dispatch]
  )

  const clear = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const itemCount = items.length
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    total,
    itemCount,
    totalItems,
    add,
    remove,
    update,
    clear,
    isEmpty: items.length === 0,
  }
}
