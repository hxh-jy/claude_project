export interface ValidationError {
  field: string
  message: string
}

/**
 * 验证注册表单
 */
export const validateRegisterForm = (data: {
  username: string
  email: string
  password: string
  confirmPassword: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.username || data.username.length < 3) {
    errors.push({
      field: 'username',
      message: 'Username must be at least 3 characters',
    })
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email address',
    })
  }

  if (!data.password || data.password.length < 6) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 6 characters',
    })
  }

  if (data.password !== data.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: 'Passwords do not match',
    })
  }

  return errors
}

/**
 * 验证登录表单
 */
export const validateLoginForm = (data: {
  email: string
  password: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email address',
    })
  }

  if (!data.password) {
    errors.push({
      field: 'password',
      message: 'Password is required',
    })
  }

  return errors
}

/**
 * 验证地址表单
 */
export const validateAddressForm = (data: {
  name: string
  phone: string
  province: string
  city: string
  district: string
  address: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.name || data.name.length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters',
    })
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Invalid phone number',
    })
  }

  if (!data.province) {
    errors.push({
      field: 'province',
      message: 'Province is required',
    })
  }

  if (!data.city) {
    errors.push({
      field: 'city',
      message: 'City is required',
    })
  }

  if (!data.address || data.address.length < 5) {
    errors.push({
      field: 'address',
      message: 'Address must be at least 5 characters',
    })
  }

  return errors
}

/**
 * 检查是否是有效的邮箱
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 检查是否是有效的电话号码
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10,11}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}
