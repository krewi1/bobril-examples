import * as b from "bobril";
import { useState, useLayoutEffect, useRef, useEffect } from "bobril";

export function RenderLocalized() {
    const [checked, setChecked] = useState(false);

    const [dimensions, ref] = useBoundingBoxBetter();
    const sibling = <div className="element">Sibling</div>;
    return (
        <div className="App">
            <div className="wrapper">
                <div className="element" ref={ref}>
                    Calculate
                </div>
                {checked && sibling}
            </div>
            <div>
                <input type="checkbox" onchange={() => setChecked(!checked)}/>
            </div>
            {`${dimensions}`}
        </div>
    )
}

export function useBoundingBoxBetter() {
    const ref = useRef();

    let [currentBox, setCurrentBox] = useState(0);
    useLayoutEffect(() => {
        console.log("useLayout 1 effect");
        setCurrentBox(index => index + 1);
    });
    useEffect(() => {

    });
    useEffect(logAnimationFrame, []);
    function logAnimationFrame() {
        window.requestAnimationFrame(() => {
            console.log("animation frame");
            logAnimationFrame();
        })
    }
    return [currentBox, ref];
}
