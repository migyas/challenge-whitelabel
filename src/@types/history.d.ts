import type { BrowserHistory, HashHistory, MemoryHistory } from "history";

declare type RouterHistory = BrowserHistory | HashHistory | MemoryHistory;
