import { Test, Expect, ToEqual } from '../test/Test.types'
import { Uuid, ObjKeys, Filter, UnionFromObj, MaybeNestedFromUnion } from '../utils/Helpers.types'

// Static
export interface Routes {
  flights: {
    auth: false,
  },
  hotels: {
    auth: false,
  },
  cars: {
    auth: false,
  },
  bookings: {
    auth: true,
    params: {
      userId: Uuid,
      tripId: Uuid,
    },
  },
  offers: {
    auth: true,
    params: {
      userId: Uuid,
      offerId: Uuid,
    },
  },
  account: {
    auth: true,
    params: {
      userId: Uuid,
      companyId: Uuid
    },
  },
}

// Dynamic
export type RouteNames = ObjKeys<Routes>
type _TestRouteNames_ = Test<Expect<RouteNames, ToEqual, 'flights' | 'hotels' | 'cars' | 'bookings' | 'offers' | 'account'>>
const navigate: RouteNames = 'account'

// Partial
type FilterRoutesByAuth<Pattern> = Filter<Routes, Pattern, 'auth'>

// Dynamic
type RoutesWithAuth = UnionFromObj<FilterRoutesByAuth<{ auth: true }>>
type _TestRoutesWithAuth_ = Test<Expect<RoutesWithAuth, ToEqual, 'bookings' | 'offers' | 'account'>>

type RoutesWithoutAuth = UnionFromObj<FilterRoutesByAuth<{ auth: false }>>
type _TestRoutesWithoutAuth_ = Test<Expect<RoutesWithoutAuth, ToEqual, 'flights' | 'hotels' | 'cars'>>

type RoutePublicPaths = `/${RoutesWithoutAuth}`
type _TestRoutePublicPaths_ = Test<Expect<RoutePublicPaths, ToEqual, '/flights' | '/hotels' | '/cars'>>

type RouteProtectedPaths = `/my/${RoutesWithAuth}`
type _TestRouteProtectedPaths_ = Test<Expect<RouteProtectedPaths, ToEqual, '/my/bookings' | '/my/offers' | '/my/account'>>

type Paths = RoutePublicPaths | RouteProtectedPaths
type _TestPaths_ = Test<Expect<Paths, ToEqual, '/flights' | '/hotels' | '/cars' | '/my/bookings' | '/my/offers' | '/my/account'>>
const sitemap: Paths = '/my/bookings'

// Partial
type RoutePrivateParams = MaybeNestedFromUnion<RoutesWithAuth, Routes, 'params'>

// Dynamic
type BookingParams = UnionFromObj<RoutePrivateParams['bookings']>
type AccountParams = UnionFromObj<RoutePrivateParams['account']>
type OfferParams = UnionFromObj<RoutePrivateParams['offers']>
type AllParams = BookingParams | AccountParams | OfferParams

type _TestParams_ = [
  Test<Expect<BookingParams, ToEqual, 'userId' | 'tripId'>>,
  Test<Expect<AccountParams, ToEqual, 'userId' | 'companyId'>>,
  Test<Expect<OfferParams, ToEqual, 'userId' | 'offerId'>>,
  Test<Expect<AllParams, ToEqual, 'userId' | 'companyId' | 'offerId' | 'tripId'>>
]

const post: AllParams = 'offerId'
