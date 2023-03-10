import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import PullToRefresh from "./PullToRefresh";
import {ReactPullToRefreshComponent} from "./ReactPullToRefreshComponent";
import './styles.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <PullToRefresh/>
        {/*<ReactPullToRefreshComponent/>*/}
    </StrictMode>
);
