import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import PullToRefresh from "./PullToRefresh";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <PullToRefresh />
  </StrictMode>
);
