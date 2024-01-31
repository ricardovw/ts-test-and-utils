import {Expect, TS, ToBe } from './Test.types'

declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

type _Branded_ = Brand<string, 'Branded'>
const branded = 'example123' as _Branded_
type _TestBrand_ = Expect<TS<typeof branded, ToBe, _Branded_>>
