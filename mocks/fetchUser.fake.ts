// Faked external lib
export type FetchedUser = {
  url: string,
  firstName: string,
  lastName: string,
  age: number
}

let user: { firstName: string, lastName: string }
export const setCtx = (ctx: typeof user) => user = ctx

export const fetchUser = async (url: string) => {
  return {
    url,
    age: Math.floor(Math.random() * 100),
    ...user,
  }
}