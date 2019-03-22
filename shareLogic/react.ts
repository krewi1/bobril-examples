import * as React from "react";
import { useEffect, useState } from "react";

export const UseStateHook: React.FunctionComponent = () => {
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(0);

    return (
        <div style={{width: "300px", height: "300px", position: "relative"}} onMouseMove={(event) => {
        setXPosition(event.clientX);
        setYPosition(event.clientY);
    }}>
    <div style={{position: "absolute", top: yPosition, left: xPosition}}>Rendered item</div>
    </div>
)
};


export const UseEffect: React.FunctionComponent = () => {
    const [pressedKey, setPressedKey] = useState("");
    useEffect(() => {
        const handler = (event: KeyboardEvent) => setPressedKey(event.key);
        window.addEventListener("keypress", handler);
        return () => window.removeEventListener("keypress", handler);
    });

    return (
        <div>
            {pressedKey}
        </div>
    )
};

export const UseEffectWithDeps: React.FunctionComponent = () => {
    const [pressedKey, setPressedKey] = useState("");
    useEffect(() => {
        const handler = (event: KeyboardEvent) => setPressedKey(event.key);
        window.addEventListener("keypress", handler);
        return () => window.removeEventListener("keypress", handler);
    }, []);

    return (
        <div>
            {pressedKey}
        </div>
    )
};

export const UseEffectNotWorking: React.FunctionComponent = () => {
    const [pressedKey, setPressedKey] = useState("");
    const [codeMode, setCodeMode] = useState(false);
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === " ") {
                setCodeMode(!codeMode);
            } else {
                setPressedKey(codeMode ? event.code : event.key);
            }
        };
        window.addEventListener("keypress", handler);
        return () => window.removeEventListener("keypress", handler);
    }, []);

    return (
        <div>
            {pressedKey}
        </div>
    )
};

export const UseEffectWorking: React.FunctionComponent = () => {
    const [pressedKey, setPressedKey] = useState("");
    const [codeMode, setCodeMode] = useState(false);
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === " ") {
                setCodeMode(!codeMode);
            } else {
                setPressedKey(codeMode ? event.code : event.key);
            }
        };
        window.addEventListener("keypress", handler);
        return () => window.removeEventListener("keypress", handler);
    }, [codeMode]);

    return (
        <div>
            {pressedKey}
        </div>
    )
};

