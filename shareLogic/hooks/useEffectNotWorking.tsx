import * as b from "bobril";

export const UseEffectNotWorking: b.IComponentFactory<{}> = () => {
    const [pressedKey, setPressedKey] = b.useState("");
    const [codeMode, setCodeMode] = b.useState(false);
    b.useEffect(() => {
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

    return <div>{pressedKey}</div>;
};
