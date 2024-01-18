import {Expect, TypeOf, ToBe } from './Test.types'

declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

type _BrandedPwd_ = Brand<string, 'Password'>
const brandedPwd: _BrandedPwd_ = 'test' as _BrandedPwd_
type _TypeBrandedPwd_ = typeof brandedPwd
type _TestBrandPwd_ = Expect<TypeOf<_TypeBrandedPwd_, ToBe, _TypeBrandedPwd_>>

// type _BrandedIsLoggedIn_ = Brand<boolean, 'IsLoggedIn'>
// const brandedIsLoggedIn: _BrandedIsLoggedIn_ = true as _BrandedIsLoggedIn_
// type _TypeBrandedIsLoggedIn_ = typeof brandedIsLoggedIn
// type _TestBrandIsLoggedIn_ = Expect<TypeOf<_TypeBrandedIsLoggedIn_, ToBe, _BrandedIsLoggedIn_>>

// type _BrandedNums_ = Brand<number, 'Nums'>
// const brandedNums: _BrandedNums_ = 1 as _BrandedNums_
// type _TypeBrandedNums_ = typeof brandedNums
// type _TestBrandNums_ = Expect<TypeOf<_TypeBrandedNums_, ToBe, _BrandedNums_>>