import { Expect, TypeOf, TS, ToBe, ToNotBe, ToEqual} from '../utils/Test.types'
import { asConst } from '../utils/Fns.types'

// AS CONST
const _asConst_ = asConst([
  { tech: "typescript", stars: 999 },
  { tech: "vuejs", stars: 888 },
])

const _asConstCasted_ = [
  { tech: "typescript", stars: 999 },
  { tech: "vuejs", stars: 888 },
] as const

type _TestAsConst_ = Expect<TS<typeof _asConst_, ToEqual, typeof _asConstCasted_>>
