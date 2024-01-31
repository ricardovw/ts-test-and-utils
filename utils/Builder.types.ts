export const config = {
  username: 'benitoj',
  firstName: 'Benito',
  lastName: 'Juarez',
}

// Fake external lib
export type FetchedUser = {
  url: string,
  firstName: string,
  lastName: string,
  age: number
}
export const fetchUser = async (url: string) => {
  return {
    url,
    firstName: config.firstName,
    lastName: config.lastName,
    age: Math.floor(Math.random() * 100)
  }
}
// Middleware through Builder Pattern
type Middleware<TInput, TOutput> = (input: TInput) => TOutput

export class DynamicMiddleware<TInput, TOutput> {
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
