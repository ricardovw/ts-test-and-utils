import type { Brand } from '../utils/Branded.types'

type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string
  confirmPassword: string
}

const createUserOnApi = (values: Valid<PasswordValues>) => {}

const onSubmitHandler = (values: PasswordValues) => {

  // TypeGuard Example
  // const isValidPassword = (values: PasswordValues) => {
  const isValidPassword = (values: PasswordValues): values is Valid<PasswordValues> => {
    return values.password === values.confirmPassword
  };

  if (isValidPassword(values)) createUserOnApi(values)

  // Assertion Function Example
  // function assertIsValidPassword(values: PasswordValues) {
  function assertIsValidPassword(values: PasswordValues): asserts values is Valid<PasswordValues> {
    if (values.password !== values.confirmPassword) {
      throw new Error("Password is invalid");
    }
  }
  
  assertIsValidPassword(values)
  createUserOnApi(values)
}

onSubmitHandler({ password: 'Test123', confirmPassword: 'Test123' })
// onSubmitHandler({})