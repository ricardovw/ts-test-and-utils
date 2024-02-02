import { Expect, TypeOf, TS, ToBe, ToNotBe, ToEqual} from './Test.types'
/*
AS CONST
---
Function that transform a data structure into its as const typed equivalented
- Needs to be called upon inference of the data, meaning it wont work if applied
to an already declared structure.

1. const array = [{...}]
2. const arrayConst = asConst(array)
This wont work because TS has already handled the inference on step 1, step 2 is already to late.

NOTE:
TS is smart enough to identify this as a runtime type helper and it actually excludes it from bundling. 
*/
export const asConst = <const T>(t: T) => t;

const _asConst_ = asConst([
  { tech: "typescript", stars: 999 },
  { tech: "vuejs", stars: 888 },
])

const _asConstCasted_ = [
  { tech: "typescript", stars: 999 },
  { tech: "vuejs", stars: 888 },
] as const

type _TestAsConst_ = Expect<TS<typeof _asConst_, ToEqual, typeof _asConstCasted_>>