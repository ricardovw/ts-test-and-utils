import { Expect, TypeOf, ToEqual } from '../utils/Test.types'
import { Uuid, ObjKeys, Filter, UnionFromObj, MaybeNestedFromUnion } from '../utils/Helper.types'

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
type _TestRouteNames_ = Expect<TypeOf<RouteNames, ToEqual, 'flights' | 'hotels' | 'cars' | 'bookings' | 'offers' | 'account'>>
const navigate: RouteNames = 'account'

// Partial
type FilterRoutesByAuth<Pattern> = Filter<Routes, Pattern, 'auth'>

// Dynamic
type RoutesWithAuth = UnionFromObj<FilterRoutesByAuth<{ auth: true }>>
type _TestRoutesWithAuth_ = Expect<TypeOf<RoutesWithAuth, ToEqual, 'bookings' | 'offers' | 'account'>>

type RoutesWithoutAuth = UnionFromObj<FilterRoutesByAuth<{ auth: false }>>
type _TestRoutesWithoutAuth_ = Expect<TypeOf<RoutesWithoutAuth, ToEqual, 'flights' | 'hotels' | 'cars'>>

type RoutePublicPaths = `/${RoutesWithoutAuth}`
type _TestRoutePublicPaths_ = Expect<TypeOf<RoutePublicPaths, ToEqual, '/flights' | '/hotels' | '/cars'>>

type RouteProtectedPaths = `/my/${RoutesWithAuth}`
type _TestRouteProtectedPaths_ = Expect<TypeOf<RouteProtectedPaths, ToEqual, '/my/bookings' | '/my/offers' | '/my/account'>>

type Paths = RoutePublicPaths | RouteProtectedPaths
type _TestPaths_ = Expect<TypeOf<Paths, ToEqual, '/flights' | '/hotels' | '/cars' | '/my/bookings' | '/my/offers' | '/my/account'>>
const sitemap: Paths = '/my/bookings'

// Partial
type RoutePrivateParams = MaybeNestedFromUnion<RoutesWithAuth, Routes, 'params'>

// Dynamic
type BookingParams = UnionFromObj<RoutePrivateParams['bookings']>
type AccountParams = UnionFromObj<RoutePrivateParams['account']>
type OfferParams = UnionFromObj<RoutePrivateParams['offers']>
type AllParams = BookingParams | AccountParams | OfferParams

type _TestParams_ = [
  Expect<TypeOf<BookingParams, ToEqual, 'userId' | 'tripId'>>,
  Expect<TypeOf<AccountParams, ToEqual, 'userId' | 'companyId'>>,
  Expect<TypeOf<OfferParams, ToEqual, 'userId' | 'offerId'>>,
  Expect<TypeOf<AllParams, ToEqual, 'userId' | 'companyId' | 'offerId' | 'tripId'>>
]

const post: AllParams = 'offerId'
