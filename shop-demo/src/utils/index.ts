/**
 * 防抖函数 - 在指定时间内多次调用只执行最后一次
 * @param func - 要执行的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * 节流函数 - 在指定时间间隔内只执行一次
 * @param func - 要执行的函数
 * @param interval - 时间间隔（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0

  return function throttled(...args: Parameters<T>) {
    const now = Date.now()

    if (now - lastCallTime >= interval) {
      func(...args)
      lastCallTime = now
    }
  }
}

/**
 * 深拷贝对象 - 递归拷贝对象和数组中的所有属性
 * @param obj - 要拷贝的对象或值
 * @param weakMap - 用于处理循环引用的 WeakMap
 * @returns 深拷贝后的对象或值
 */
export function deepClone<T>(obj: T, weakMap: WeakMap<object, any> = new WeakMap()): T {
  // 基本类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理循环引用
  if (weakMap.has(obj)) {
    return weakMap.get(obj)
  }

  // 处理 Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  // 处理 RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as any
  }

  // 处理 Map
  if (obj instanceof Map) {
    const mapClone = new Map()
    weakMap.set(obj, mapClone)
    obj.forEach((value, key) => {
      mapClone.set(deepClone(key, weakMap), deepClone(value, weakMap))
    })
    return mapClone as any
  }

  // 处理 Set
  if (obj instanceof Set) {
    const setClone = new Set()
    weakMap.set(obj, setClone)
    obj.forEach((value) => {
      setClone.add(deepClone(value, weakMap))
    })
    return setClone as any
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const arrClone: any[] = []
    weakMap.set(obj, arrClone)
    obj.forEach((item, index) => {
      arrClone[index] = deepClone(item, weakMap)
    })
    return arrClone as any
  }

  // 处理对象
  const clone = {} as T
  weakMap.set(obj, clone)

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], weakMap)
    }
  }

  return clone
}
