import { Expect, TypeOf, TS, ToBe, ToNotBe, ToEqual} from './Test.types'
/*
UUID
---
Enforces a string that matches the pattern of a Uuid
*/
export type Uuid = `${string}-${string}-${string}-${string}-${string}`

type _TestUuidValid_ = Expect<TypeOf<'806a76bf-b43d-4567-9ef9-b06c042ce461', ToBe, Uuid>>
type _TestUuidInvalid_ = Expect<TypeOf<'806a76bf-4567-9ef9-b06c042ce461', ToNotBe, Uuid>>
type _TestUuidInvalidTwo_ = Expect<TypeOf<'test-uuid-invalid', ToNotBe, Uuid>>
/*
OBJ KEYS
---
Transforms an object type into a union of its keys
*/
export type ObjKeys<Type> = { [Key in keyof Type]: Key }[keyof Type]

type _TestObjKeys_ = Expect<TypeOf<ObjKeys<{ id: number, user: string }>, ToEqual, "id" | "user">>
/*
UNION FROM OBJ #Alias: ObjKeys
---
Transforms an object type into a union of its keys
*/
export type UnionFromObj<Type> = ObjKeys<Type>

type _TestUnionFromObj_ = Expect<TypeOf<UnionFromObj<{ id: number, user: string }>, ToEqual, 'id' | 'user'>>
/*
OBJ FROM UNION
---
Transforms a Union type into a keyed Object type with optional value

@Value is optional and defaults to unknown
*/
export type ObjFromUnion<Type extends string, Value = unknown> = Record<Type, Value>

type _TestObjFromUnion_ = Expect<TypeOf<ObjFromUnion<'id' | 'user'>, ToEqual, { id: unknown, user: unknown}>>
type _TestObjFromUnionWithValue_ = Expect<TypeOf<ObjFromUnion<'id' | 'user', 'test'>, ToEqual, { id: 'test', user: 'test'}>>
/*
FILTER
---
Filters an object type based on a matching pattern and optionally reassigns value to key
*/
export type Filter<Type, Pattern, Value = void> = {
  [Key in keyof Type as Type[Key] extends Pattern ? Key : never]: Value extends keyof Type[Key]
    ? Type[Key][Value]
    : Type[Key]
}

type _TestFilter_ = Expect<
  TypeOf<
    Filter<
      // @Type
      { flights: { auth: false }, account: { auth: true } },
      // @Pattern
      { auth: true }
    >,
    ToEqual,
      // Returns
      { account: { auth: true } }
  >
>

type _TestFilterWithValue_ = Expect<
  TypeOf<
    Filter<
      // @Type
      { flights: { auth: false }, account: { auth: true } },
      // @Pattern
      { auth: true },
    // @Value: optional
    'auth'
    >,
    ToEqual,
      // Returns
      { account: true }
  >
>
/*
ONLY MATCHED KEYS
---
Takes a union of keys and only returns the ones that match the pattern provided.
*/
export type OnlyMatchedKeys<Key, Pattern> = Key extends Pattern ? Key : never

type _TestOnlyMatchedKeys_ = Expect<
  TypeOf<
    OnlyMatchedKeys<
    // @Type
    'hero' | 'h1' | 'p' | 'mega',
    // @Pattern
    `h${string}`
    >,
    ToEqual,
    // Returns
    'hero' | 'h1'
  >
>
/*
MAYBE NESTED FROM UNION
---
Returns an object with the intersection of a Union key and an irregular object that may contain a nested key.
- If the nested key is present the nested key's value is reassigned to it's union key.
- If the nested key is missing the union key is assigned a 'never' value, gracefully handling irregular structures.
*/
export type MaybeNestedFromUnion<Union extends string, Obj, NestedKey extends string> = {
  [Key in keyof ObjFromUnion<Union>]: Key extends keyof Obj
    ? NestedKey extends keyof Obj[Key]
      ? Obj[Key][NestedKey]
      : never
    : never
}

type _TestMaybeNestedFromUnion_ = Expect<
  TypeOf<
    MaybeNestedFromUnion<
      // @Union
      'flights' | 'bookings',
      // @Obj
      { flights: { auth: false }, bookings: { auth: true, params: { userId: Uuid } } },
      // @NestedKey
      'params'
    >,
    ToEqual,
      // Returns
      { 
        flights: never,
        bookings: { userId: Uuid }
      }
  >
>

type _TestMaybeNestedFromUnionWithUnionPartialSelection_ = Expect<
  TypeOf<
    UnionFromObj<
      MaybeNestedFromUnion<
        // @Union
        'flights' | 'bookings',
        // @Obj
        { flights: never, bookings: { auth: true, params: { userId: Uuid, companyId: Uuid } } },
        // @NestedKey
        'params'
      // Partial selection
      >['bookings']
    >,
    ToEqual,
      // Returns
      'userId' | 'companyId'
  >
>
/*
BRAND
---
Brands a type with the intersection of a generic type and a unique global symbol.
- requires casting
*/
declare const brand: unique symbol
export type Brand<T, TBrand> = T & { [brand]: TBrand }

type _Branded_ = Brand<string, 'Branded'>
const branded = 'example123' as _Branded_
type _TestBrand_ = Expect<TS<typeof branded, ToBe, _Branded_>>
