export type TO_BE = 'ToBe'
export type TO_NOT_BE = 'ToNotBe'
export type TO_EQUAL = 'ToEqual'

export type ToBe = TO_BE
export type ToNotBe = TO_NOT_BE
export type ToEqual = TO_EQUAL

type AssertionType = TO_BE | TO_NOT_BE | TO_EQUAL

// Base Test Case
export type Expect<Result extends true> = Result

// Polymorphic Assertion Handler
export type TypeOf<Input, Assertion extends AssertionType, Expected> = Assertion extends TO_EQUAL
  ? AssertEqual<Input, Expected>
  : Assertion extends TO_BE
    ? AssertToBe<Input, Expected>
    : Assertion extends TO_NOT_BE
      ? AssertNotBe<Input, Expected>
      : false

export type TS<I, A extends AssertionType, E> = TypeOf<I, A, E>

// Assert input to be type
export type AssertToBe<Input, Type> = Input extends Type ? true : false
// Assert input not to be type
export type AssertNotBe<Input, Type> = Input extends Type ? false : true
// Assert return type of input to equal output
export type AssertEqual<Input, Output> = (<T>() => T extends Input ? 1 : 2) extends <T>() => T extends Output ? 1 : 2 ? true : false
