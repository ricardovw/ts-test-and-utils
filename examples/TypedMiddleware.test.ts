import { test, expect } from 'vitest'
import { DynamicMiddleware } from '../utils/Builder.types'
import { fetchUser, FetchedUser, setCtx } from '../mocks/fetchUser.fake'
import { Expect, TS, ToBe } from '../utils/Test.types'

export const config = {
  username: 'benitoj',
  firstName: 'Benito',
  lastName: 'Juarez',
}

setCtx(config)

const middleware = new DynamicMiddleware((req: Request) => {
  return {
    ...req,
    username: req.url.split("/")[2]
  };
})
.use((req) => {
  return {
    ...req,
    isLoggedIn: req.username === config.username
  };
})
.use((req) => {
  if (!req.isLoggedIn) {
    throw new Error();
  }
  return req;
})
.use(async (req) => {
  return {
    ...req,
    user: await fetchUser(`/user/${req.username}`),
  };
});

test("Should throw error if isLoggedIn is falsy", () => {
  expect(middleware.run({ url: "/user/123" } as Request)).rejects.toThrow()
});

test("Should build response correctly", async () => {
  const {
    username,
    isLoggedIn,
    user,
  } = await middleware.run({ url: `/user/${config.username}` } as Request)

  expect(username).toBe(config.username)
  type _TestUsername_ = Expect<TS<typeof username, ToBe, string>>
  
  expect(isLoggedIn).toBe(true)
  type _TestIsLoggedIn_ = Expect<TS<typeof isLoggedIn, ToBe, Boolean>>
  
  expect(user.url).toBe(`/user/${config.username}`)
  expect(user.firstName).toBe(config.firstName)
  expect(user.lastName).toBe(config.lastName)
  expect(user.age).toBeTruthy()

  type _TestUser_ = Expect<TS<typeof user, ToBe, FetchedUser>>
});