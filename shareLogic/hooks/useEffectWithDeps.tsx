import * as b from "bobril";

export const UseEffectWithDeps = () => {
    const [pressedKey, setPressedKey] = b.useState("");
    b.useEffect(() => {
        console.log("binding will happen");
        const handler = (event: KeyboardEvent) => setPressedKey(event.key);
        window.addEventListener("keypress", handler);
        return () => window.removeEventListener("keypress", handler);
    }, []);

    return (
        <div>
            <div>Focus browser and start typing</div>
            {pressedKey}
        </div>
    );
};
