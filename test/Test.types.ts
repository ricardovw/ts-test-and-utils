// Constants
type TO_BE = 'ToBe'
type TO_NOT_BE = 'ToNotBet'
type TO_EQUAL = 'ToEqual'

// Base Test Case
export type TestType<Result extends true> = Result

// Polymorphic Assertion Handler
export type Expect<Input, Output extends [string, unknown]> = Output[0] extends TO_EQUAL
  ? AssertEqual<Input, Output[1]>
  : Output[0] extends TO_BE
    ? AssertToBe<Input, Output[1]>
    : Output[0] extends TO_NOT_BE
      ? AssertNotBe<Input, Output[1]>
      : false

// Declarative Wrappers
export type ToBe<Output> = [TO_BE, Output]
export type ToNotBe<Output> = [TO_NOT_BE, Output]
export type ToEqual<Output> = [TO_EQUAL, Output]

// Assert input to be type
export type AssertToBe<Input, Type> = Input extends Type ? true : false
// Assert input not to be type
export type AssertNotBe<Input, Type> = Input extends Type ? false : true
// Assert return type of input to equal output
export type AssertEqual<Input, Output> = (<T>() => T extends Input ? 1 : 2) extends <T>() => T extends Output ? 1 : 2 ? true : false
