import { test, expect } from 'vitest'

const config = {
  username: 'benitoj',
  firstName: 'Benito',
  lastName: 'Juarez',
}

// Fake external lib
const fetchUser = async (url: string) => {
  return {
    url,
    firstName: config.firstName,
    lastName: config.lastName,
  }
}
// Middleware through Builder Pattern
type Middleware<TInput, TOutput> = (input: TInput) => TOutput

class DynamicMiddleware<TInput, TOutput> {
  private middleware: Middleware<any, any>[] = []

  constructor(firstMiddleware: Middleware<TInput, TOutput>) {
    this.middleware.push(firstMiddleware);
  }

  use<TNewOutput>(middleware: Middleware<TOutput, TNewOutput>): DynamicMiddleware<TInput, TNewOutput> {
    this.middleware.push(middleware);

    return this as any;
  }

  async run(input: TInput): Promise<TOutput> {
    let result: TOutput = input as any;

    for (const middleware of this.middleware) {
      result = await middleware(result);
    }

    return result;
  }
}

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
  const result = await middleware.run({ url: `/user/${config.username}` } as Request)

  expect(result.username).toBe(config.username)
  expect(result.isLoggedIn).toBe(true)
  expect(result.user.url).toBe(`/user/${config.username}`)
  expect(result.user.firstName).toBe(config.firstName)
  expect(result.user.lastName).toBe(config.lastName)
});