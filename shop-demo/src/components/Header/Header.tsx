import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/routes'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const { totalItems } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.home)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={ROUTES.home}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          >
            Shop Demo
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.home}
              className={styles.navLink}
            >
              Home
            </Link>
            <Link
              to={ROUTES.orders}
              className={styles.navLink}
            >
              Orders
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to={ROUTES.cart}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h5M17 13v8m-4-8v8"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 text-sm">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to={ROUTES.login}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Login
                </Link>
                <span className="text-gray-400">/</span>
                <Link
                  to={ROUTES.register}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
