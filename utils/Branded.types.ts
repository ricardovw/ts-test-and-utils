import {Expect, TS, ToBe } from './Test.types'

declare const brand: unique symbol;

export type Brand<T, TBrand> = T & { [brand]: TBrand };

type _Branded_ = Brand<string, 'Branded'>
const branded: _Branded_ = 'example123' as _Branded_
type _TestBrand_ = Expect<TS<typeof branded, ToBe, _Branded_>>

///////////////////
const example = () => {
  type PostId = Brand<string, "PostId">
  type UserId = Brand<string, "UserId">

  interface User { id: UserId; handle: string; }
  interface Post { id: PostId; title: string; }

  const db: Record<PostId, Post> & Record<UserId, User> = {};

  const postId = "post_1" as PostId;
  db[postId] = { id: postId, title: "Hello Branded Types!" }
  const userId = "user_1" as UserId;
  db[userId] = { id: userId, handle: "@brandedTypes" }

  const post = db[postId];
  const user = db[userId];

  // const tryout = post.

  type Tests = [
    Expect<TS<typeof post, ToBe ,Post>>,
    Expect<TS<typeof user, ToBe ,User>>,
  ];
}

const stateExample = () => {
  type Valid<T> = Brand<T, "Valid">;

  interface PasswordValues {
    password: string
    confirmPassword: string
  }

  const createUserOnApi = (values: Valid<PasswordValues>) => {}

  const onSubmitHandler = (values: PasswordValues) => {

    // TypeGuard Example
    // const isValidPassword = (values: PasswordValues) => {
    const isValidPassword = (values: PasswordValues): values is Valid<PasswordValues> => {
      return values.password === values.confirmPassword
    };

    if (isValidPassword(values)) createUserOnApi(values)

    // Assertion Function Example
    // function assertIsValidPassword(values: PasswordValues) {
    function assertIsValidPassword(values: PasswordValues): asserts values is Valid<PasswordValues> {
      if (values.password !== values.confirmPassword) {
        throw new Error("Password is invalid");
      }
    }
    
    assertIsValidPassword(values);
    createUserOnApi(values)
  }

  onSubmitHandler({ password: 'Test123', confirmPassword: 'Test123' })
}
