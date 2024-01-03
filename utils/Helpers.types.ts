import { Test, Expect, ToBe, ToNotBe, ToEqual} from '../test/Test.types'
/*
UUID
---
Enforces a string that matches the pattern of a Uuid
*/
export type Uuid = `${string}-${string}-${string}-${string}-${string}`

type _TestUuidValid_ = Test<Expect<'806a76bf-b43d-4567-9ef9-b06c042ce461', ToBe, Uuid>>
type _TestUuidInvalid_ = Test<Expect<'806a76bf-4567-9ef9-b06c042ce461', ToNotBe, Uuid>>
type _TestUuidInvalidTwo_ = Test<Expect<'test-uuid-invalid', ToNotBe, Uuid>>
/*
OBJ KEYS
---
Transforms an object type into a union of its keys
*/
export type ObjKeys<Type> = { [Key in keyof Type]: Key }[keyof Type]

type _TestObjKeys_ = Test<Expect<ObjKeys<{ id: number, user: string }>, ToEqual, "id" | "user">>
/*
UNION FROM OBJ #Alias: ObjKeys
---
Transforms an object type into a union of its keys
*/
export type UnionFromObj<Type> = ObjKeys<Type>

type _TestUnionFromObj_ = Test<Expect<UnionFromObj<{ id: number, user: string }>, ToEqual, 'id' | 'user'>>
/*
OBJ FROM UNION
---
Transforms a Union type into a keyed Object type with optional value

@Value is optional and defaults to unknown
*/
export type ObjFromUnion<Type extends string, Value = unknown> = Record<Type, Value>

type _TestObjFromUnion_ = Test<Expect<ObjFromUnion<'id' | 'user'>, ToEqual, { id: unknown, user: unknown}>>
type _TestObjFromUnionWithValue_ = Test<Expect<ObjFromUnion<'id' | 'user', 'test'>, ToEqual, { id: 'test', user: 'test'}>>
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

type _TestFilter_ = Test<
  Expect<
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

type _TestFilterWithValue_ = Test<
  Expect<
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

type _TestMaybeNestedFromUnion_ = Test<
  Expect<
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

type _TestMaybeNestedFromUnionWithUnionPartialSelection_ = Test<
  Expect<
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
