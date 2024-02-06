import { Expect, TypeOf, TS, ToBe, ToNotBe, ToEqual} from '../utils/Test.types'
import { asConst, configRouteAndGetters, InferRouteGetters, nameReverseMap } from '../utils/Fns.types'

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

// MAPPED ROUTE GETTERS
const _routeGettersEmpty_ = configRouteAndGetters({
  routes: [],
  getters: {},
})

type _TestRouteGettersEmpty_ = Expect<TS<typeof _routeGettersEmpty_, ToBe, InferRouteGetters<never>>>

const _routeGettersOne_ = configRouteAndGetters({
  routes: ['/my/account'],
  getters: {},
})

type _TestRouteGettersOne_ = Expect<TS<typeof _routeGettersOne_, ToBe, InferRouteGetters<'/my/account'>>>

const _routeGettersTwo_ = configRouteAndGetters({
  routes: ['/my/account', '/my/flights'],
  getters: {
    '/my/account': () => {},
  },
})

type _TestRouteGettersTwo_ = Expect<TS<typeof _routeGettersTwo_, ToBe, InferRouteGetters<'/my/account' | '/my/flights'>>>

// EVENT HANDLER REVERSE MAP
const handlers = nameReverseMap({
  click: (name) => {
    type _TestMakeEventHandlersClick_ = Expect<TS<typeof name, ToBe, 'click'>>
  },
  focus: (name) => {
    type _TestMakeEventHandlersFocus_ = Expect<TS<typeof name, ToBe, 'focus'>>
  },
})
