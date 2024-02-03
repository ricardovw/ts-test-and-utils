/*
AS CONST
---
Function that transform a data structure into its as const typed equivalented
- Needs to be called upon inference of the data, meaning it wont work if applied
to an already declared structure.

1. const array = [{...}]
2. const arrayConst = asConst(array)

This wont work because TS has already handled the inference on step 1, step 2 it wont be re-infered.

NOTE:
TS is smart enough to identify this as a runtime type helper and it actually excludes it from bundling. 
*/

export const asConst = <const T>(t: T) => t;
/*
MAKE CONFIG
---
Type helper function that helps TS infer values within the same data structure. 
*/

export interface InferRouteGetters<Route extends string> {
  routes: Route[];
  getters: {
    [K in Route]?: () => void;
  };
}

export const configRouteAndGetters = <Route extends string>(config: InferRouteGetters<Route>) => config
