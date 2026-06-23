export type { SearchEntry } from "./search-meta";
import { GENERATED_SEARCH_INDEX } from "./search-index.generated";
import { MANUAL_ENTRIES } from "./search-meta";

export const SEARCH_INDEX = [...GENERATED_SEARCH_INDEX, ...MANUAL_ENTRIES];
