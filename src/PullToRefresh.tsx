import {useMemo, useRef, useState, useEffect} from "react";
import "./styles.css";
import {Stack, Box, CircularProgress} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const pointerEventsEnabled = true;

const supportsPointerEvents =
    typeof window !== "undefined" && !!window.PointerEvent;

const distIgnored = 50;
const distThreshold = 79;
const distMax = 80;
const distReload = 80;

const fetchData = (): Promise<null> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 100);
    });

const resistanceFunction = (t: number): number => Math.min(1, t / 2.5);

const screenY = function screenY(event: TouchEvent | PointerEvent): number {
    if (event.type.startsWith("pointer")) {
        return (event as PointerEvent).screenY;
    } else if (event.type.startsWith("touch")) {
        return (event as TouchEvent).touches[0].screenY;
    }
    return 0;
};

let timeout: ReturnType<typeof setTimeout>;

export default function PullToRefresh() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [pullStartY, setPullStartY] = useState(0);
    const [state, setState] = useState<
        "pending" | "pulling" | "refreshing" | "releasing"
    >("pending");
    const [distResisted, setDistResisted] = useState(0);

    useEffect(() => {
        function handleScroll() {
            if (scrollRef.current?.scrollTop) {
                setScrollTop(scrollRef.current?.scrollTop);
            }
        }

        scrollRef.current?.addEventListener("scroll", handleScroll);
        return () => {
            scrollRef.current?.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const enabled = useMemo(() => {
        return !scrollTop;
    }, [scrollTop]);

    console.table({shouldPullToRefresh: enabled, scrollTop})
    console.log(scrollRef.current)

    const [height, setHeight] = useState(0);

    return (
        <Stack
            className="App"
            onTouchStart={(e) => {
                if (state !== "pending") {
                    return;
                }
                const touchEvent = (e as unknown) as TouchEvent;
                if (enabled) {
                    setPullStartY(screenY(touchEvent));
                }
                clearTimeout(timeout);
            }}
            onTouchMove={(e) => {
                if (!enabled) {
                    return
                }
                const touchEvent = (e as unknown) as TouchEvent;
                let distExtra;
                const pullMoveY = screenY(touchEvent);
                if (state === "pending") {
                    setState('pulling')
                }
                if (pullStartY && pullMoveY) {
                    const dist = (pullMoveY - pullStartY);
                    distExtra = (dist - distIgnored);
                }
                if (distExtra && distExtra > 0) {
                    if (touchEvent.cancelable) {
                        e.preventDefault();
                    }
                    const distResisted =
                        resistanceFunction(distExtra / distThreshold) *
                        Math.min(distMax, distExtra);
                    console.table({distExtra, distResisted})
                    setDistResisted(distResisted);
                    setHeight(distResisted);
                    if (state === "pulling" && distExtra > distThreshold) {
                        setState("releasing");
                    }
                    if (state === "releasing" && distExtra < distThreshold) {
                        setState("pulling");
                    }
                }
            }}
            onTouchEnd={() => {
                if (state === "releasing" && distResisted > distThreshold) {
                    setState("refreshing");
                    timeout = setTimeout(async () => {
                        // await fetchData();
                        setState("pending");
                        setHeight(0);
                    }, 500);
                } else {
                    if (state === "refreshing") {
                        return;
                    }
                    setHeight(0);
                    setState("pending");
                }
                setPullStartY(0);
            }}
        >
            <Stack
                sx={{
                    height: `${height}px`,
                    overflow: "hidden",
                }}
                alignItems='center'
                justifyContent='center'
            >
                <CircularProgress disableShrink color="inherit" size={24}/>
            </Stack>
            <Box
                ref={scrollRef}
                sx={{
                    touchAction: 'pan-x pan-down pinch-zoom',
                    height: '600px',
                    overflow: 'scroll'
                }}>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
                <h1>Lorem ipsum</h1>
            </Box>
        </Stack>
    );
}
