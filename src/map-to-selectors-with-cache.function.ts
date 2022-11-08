import {
  createSelectorsCache,
  Selectors,
  SelectorsCache,
} from "@state-adapt/core";

// Included in next StateAdapt releasex
export function mapToSelectorsWithCache<State, S extends Selectors<State>>(
  selectors: S,
  getFeature: (state: any) => State,
  cache?: SelectorsCache,
): S {
  const definedCache = cache || createSelectorsCache();
  const newSelectors = {} as any;
  for (const prop in selectors) {
    newSelectors[prop] = (state: any) =>
      (selectors[prop] as any)(getFeature(state), definedCache);
  }
  return newSelectors;
}
