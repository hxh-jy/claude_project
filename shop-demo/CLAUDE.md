# Shop Demo - 前端代码规范和最佳实践

## 一、TypeScript 规范

### 1.1 类型定义
- 所有函数参数和返回值都必须有明确的类型注解
- 优先使用 interface 定义对象类型，使用 type 定义联合类型或其他复杂类型
- 避免使用 any，如果不确定类型使用 unknown，然后进行类型守卫

```typescript
// ✅ 好的做法
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ 避免
function calculateTotal(items: any): any {
  return items.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
}
```

### 1.2 泛型使用
- 合理使用泛型来提高代码复用性和类型安全
- 为泛型参数提供约束

```typescript
// ✅ 好的做法
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// 使用
const product = await fetchData<Product>('/api/products/1');
```

---

## 二、React 和 Hooks 规范

### 2.1 函数组件和 Hooks
- 所有组件必须是函数组件，不使用类组件
- 使用 React 16.8+ 的 Hooks
- Hooks 只在组件顶层调用，不在循环、条件或嵌套函数中调用

```typescript
// ✅ 好的做法
interface ProductProps {
  productId: string;
}

const ProductDetail: React.FC<ProductProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <div>{product.name}</div>;
};

// ❌ 避免
const ProductDetail = ({ productId }: any) => {
  let product: any;
  if (productId) {
    const [product, setProduct] = useState(null); // 条件中使用 Hook
  }
  return <div>{product?.name}</div>;
};
```

### 2.2 自定义 Hooks
- 提取可复用的逻辑到自定义 Hooks
- Hook 名称以 use 开头
- 提供清晰的 JSDoc 文档

```typescript
// ✅ 好的做法
/**
 * 管理购物车相关的逻辑
 * @returns 购物车相关的状态和方法
 */
function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const addItem = useCallback((product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [items]);

  return { items, total, addItem };
}
```

### 2.3 性能优化
- 使用 React.memo 包装接收相同 props 时不需要重新渲染的组件
- 使用 useCallback 缓存函数，避免不必要的重新创建
- 使用 useMemo 缓存计算结果

```typescript
// ✅ 好的做法
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = React.memo<ProductCardProps>(({ product, onAddToCart }) => {
  const handleClick = useCallback(() => {
    onAddToCart(product);
  }, [product, onAddToCart]);

  return (
    <div onClick={handleClick}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
```

---

## 三、组件结构规范

### 3.1 组件文件组织
- 每个组件一个文件或一个文件夹
- 组件文件夹包含：组件文件、样式文件、类型文件（如需要）

```
components/
├── ProductCard/
│   ├── ProductCard.tsx
│   ├── ProductCard.module.css
│   └── types.ts
├── CartItem/
│   ├── CartItem.tsx
│   └── CartItem.module.css
└── ...
```

### 3.2 组件导出
- 使用 export default 导出主组件
- 将类型和辅助函数一起导出

```typescript
// ProductCard.tsx
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // ...
};

export default ProductCard;
```

### 3.3 Props 定义
- 为所有组件定义 Props 接口
- 使用 React.FC<Props> 类型注解组件

```typescript
// ✅ 好的做法
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

---

## 四、状态管理（Redux Toolkit）

### 4.1 Slice 创建
- 使用 Redux Toolkit 的 createSlice 创建 reducer
- 每个 Slice 对应一个业务模块

```typescript
// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cart';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

### 4.2 Store 配置
- 在 store/index.ts 中配置 Redux Store

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 4.3 Hook 使用
- 使用 Redux Toolkit 提供的 hooks

```typescript
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 在组件中使用
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = useAppSelector((state) => state.cart.total);

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
      <div>Total: ${total}</div>
    </div>
  );
};
```

---

## 五、样式规范

### 5.1 Tailwind CSS 使用
- 优先使用 Tailwind CSS 的原子类
- 避免过度嵌套的选择器
- 使用 @apply 提取可复用的样式

```typescript
// ✅ 好的做法
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};
```

### 5.2 CSS Modules 使用
- 对于局部样式，使用 CSS Modules
- 文件命名：ComponentName.module.css

```css
/* ProductCard.module.css */
.card {
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}
```

```typescript
import styles from './ProductCard.module.css';

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{product.name}</h3>
    </div>
  );
};
```

---

## 六、API 和数据服务

### 6.1 Service 层抽象
- 所有 API 调用都通过 Service 层
- 使用 Axios 或 Fetch API
- 返回类型化的响应

```typescript
// services/productService.ts
import { Product } from '../types/product';

interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  async getProducts(page: number, limit: number): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/products/search', {
      params: { q: query },
    });
    return response.data.data;
  },
};
```

### 6.2 错误处理
- 统一处理 API 错误
- 提供用户友好的错误提示

```typescript
// utils/errorHandler.ts
export class ApiError extends Error {
  constructor(
    public code: number,
    public message: string
  ) {
    super(message);
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      error.response.status,
      error.response.data?.message || 'An error occurred'
    );
  }
  return new ApiError(500, 'Network error');
};

// 在 Service 中使用
export const productService = {
  async getProducts(page: number, limit: number): Promise<Product[]> {
    try {
      const response = await apiClient.get<ApiResponse<Product[]>>('/products', {
        params: { page, limit },
      });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
```

---

## 七、路由规范

### 7.1 路由配置
- 使用 React Router v6
- 集中管理路由配置
- 使用命名路由避免硬编码路径

```typescript
// routes/index.tsx
import { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
    ],
  },
];

export const ROUTES = {
  home: '/',
  product: (id: string) => `/product/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
};
```

### 7.2 路由使用
```typescript
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(ROUTES.product(product.id))}
    >
      {/* ... */}
    </div>
  );
};
```

---

## 八、代码组织和命名

### 8.1 文件和文件夹命名
- 组件文件夹和文件：PascalCase（ProductCard, CartItem）
- 工具函数和 Hooks：camelCase（useAuth, formatPrice）
- 常量：UPPER_SNAKE_CASE（MAX_ITEMS, DEFAULT_PAGE_SIZE）
- 类型文件：可以是 types.ts 或 index.ts

### 8.2 变量和函数命名
```typescript
// ✅ 好的做法
const MAX_CART_ITEMS = 100;
const isLoading = true;
const handleAddToCart = () => { /* ... */ };
const formatPrice = (price: number): string => { /* ... */ };
const getUserById = async (id: string): Promise<User> => { /* ... */ };

// ❌ 避免
const max = 100;
const loading = true;
const addToCart = () => { /* ... */ };
const format = (p) => { /* ... */ };
const getUser = async (i) => { /* ... */ };
```

### 8.3 注释和文档
- 在复杂逻辑处添加注释说明"为什么"，不是"是什么"
- 为 Hooks、Service 方法提供 JSDoc 文档
- 避免明显的注释

```typescript
// ✅ 好的做法
/**
 * 计算购物车总价，应用优惠券折扣
 * @param items - 购物车项列表
 * @param coupon - 优惠券代码（可选）
 * @returns 最终总价
 */
function calculateCartTotal(items: CartItem[], coupon?: string): number {
  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 应用优惠券折扣（如果使用了会员优惠券）
  if (coupon === 'MEMBER10') {
    total *= 0.9;
  }

  return total;
}

// ❌ 避免
function calculateTotal(items, coupon) {
  // 计算总价
  let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // 如果有优惠券
  if (coupon === 'MEMBER10') {
    total *= 0.9;
  }
  // 返回总价
  return total;
}
```

---

## 九、测试规范

### 9.1 单元测试
- 使用 Vitest + React Testing Library
- 测试文件放在 tests 或 __tests__ 文件夹
- 测试文件命名：ComponentName.test.tsx

```typescript
// tests/ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    stock: 10,
  };

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', async () => {
    const handleAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

---

## 十、代码审查检查清单

在提交代码前检查：

- [ ] 所有类型都有明确的注解，没有使用 any
- [ ] 所有组件都是函数组件，使用 Hooks
- [ ] 遵循 React Hooks 规则（顶层调用）
- [ ] Props 使用接口定义，组件使用 React.FC<Props>
- [ ] 状态管理通过 Redux Toolkit，没有 prop drilling
- [ ] API 调用通过 Service 层进行
- [ ] 样式使用 Tailwind CSS，复杂样式使用 CSS Modules
- [ ] 路由使用集中管理的 ROUTES 对象
- [ ] 变量和函数命名清晰，遵循命名规范
- [ ] 复杂逻辑有注释说明
- [ ] 没有控制台错误或警告
- [ ] 代码通过 ESLint 和 Prettier 检查
- [ ] 相关单元测试已编写

---

## 十一、环境配置

### 11.1 .env 文件
```env
# .env.example
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Shop Demo
VITE_APP_VERSION=1.0.0
```

### 11.2 TSConfig
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 十二、提交规范

遵循约定式提交（Conventional Commits）：

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: feat, fix, docs, style, refactor, test, chore
- **scope**: 影响的模块或组件
- **subject**: 简短描述（命令式，首字母小写）
- **body**: 详细描述（可选）
- **footer**: 关联问题编号（可选）

示例：
```
feat(cart): add coupon discount functionality

Add support for applying coupon codes to reduce cart total.

Closes #123
```

