import {useMemo, useRef, useState, useEffect, useCallback} from "react";
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
    const [pullStartY, setPullStartY] = useState(0);
    const [state, setState] = useState<
        "pending" | "pulling" | "refreshing" | "releasing"
    >("pending");
    const [height, setHeight] = useState(0);

    const [enabled, setEnabled] = useState(true);

    const onScroll = useCallback(() => {
        console.log('scroll')
        // console.log(scrollRef.current?.offsetParent?.scrollTop)
        const enabled = !scrollRef.current?.offsetParent?.scrollTop
        setEnabled(enabled)
        return enabled
    }, [scrollRef])

    // useEffect(() => {
    //     console.log(scrollRef.current?.offsetTop)
    // }, [scrollRef])

    return (
        <Stack
            className="App"
            sx={{
                height: '100%',
                overflow: 'auto',
                position: 'relative'
            }}
            onTouchStart={(e) => {
                // const enabled = onScroll()
                if (state !== "pending" || !enabled) {
                    return;
                }
                const touchEvent = (e as unknown) as TouchEvent;
                setPullStartY(screenY(touchEvent));
                clearTimeout(timeout);
            }}
            onTouchMove={(e) => {
                // const enabled = onScroll()
                if (!enabled) {
                    return
                }
                // scrollRef.current?.style.touchAction = ''
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
                if (distExtra ) {
                    if (touchEvent.cancelable) {
                        e.preventDefault();
                    }
                    const distResisted =
                        resistanceFunction(distExtra / distThreshold) *
                        Math.min(distMax, distExtra);
                    setHeight(distResisted);
                    debugger
                    if (state === "pulling" && distExtra > distThreshold) {
                        setState("releasing");
                    }
                    if (state === "releasing" && distExtra < distThreshold) {
                        setState("pulling");
                    }
                }
            }}
            onTouchEnd={() => {
                if (state === "releasing" && height > distThreshold) {
                    setState("refreshing");
                    timeout = setTimeout(async () => {
                        console.log('refresh')
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
            onScroll={() => {
                onScroll()
            }
            }
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
                    touchAction: enabled ? 'pan-x pan-down pinch-zoom' : ''
                }}
            >
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
