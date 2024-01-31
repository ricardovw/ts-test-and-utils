import type { Brand } from '../utils/Branded.types'
import type { TS, Expect, ToBe } from '../utils/Test.types'

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

// const tryout = 

type Tests = [
  Expect<TS<typeof post, ToBe ,Post>>,
  Expect<TS<typeof user, ToBe ,User>>,
];