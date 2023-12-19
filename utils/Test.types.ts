// Constants
type TO_BE = 'ToBe'
type TO_NOT_BE = 'ToNotBet'
type TO_EQUAL = 'ToEqual'

// Base Test Assertions
export type TestType<Result extends true> = Result

export type Expect<Input, Output extends [string, unknown]> = Output[0] extends TO_EQUAL
  ? _ToEqual<Input, Output[1]>
  : Output[0] extends TO_BE
  ? _ToBe<Input, Output[1]>
  : Output[0] extends TO_NOT_BE
  ? _ToNotBe<Input, Output[1]>
  : false

// Expect input to be type
export type ToBe<Output> = [TO_BE, Output]
export type _ToBe<Input, Type> = Input extends Type ? true : false

// Expect input not to be type
export type ToNotBe<Output> = [TO_NOT_BE, Output]
export type _ToNotBe<Input, Type> = Input extends Type ? false : true

// Expect return type of input to equal output
export type ToEqual<Output> = [TO_EQUAL, Output]
export type _ToEqual<Input, Output> = (<T>() => T extends Input ? 1 : 2) extends <T>() => T extends Output ? 1 : 2 ? true : false
