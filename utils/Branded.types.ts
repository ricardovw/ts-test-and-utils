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

  type Tests = [
    Expect<TS<typeof post, ToBe ,Post>>,
    Expect<TS<typeof user, ToBe ,User>>,
  ];
}
