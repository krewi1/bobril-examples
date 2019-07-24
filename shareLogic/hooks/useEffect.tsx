import * as b from "bobril";

export const UseEffect = () => {
    const [pressedKey, setPressedKey] = b.useState("");
    b.useLayoutEffect(() => {
        console.log("layoutEffect")
    });
    requestAnimationFrame(() => console.log("animation frame"));
    b.useEffect(() => {
        console.log("effect")
    });
    b.useEffect(() => {
        console.log("binding will happen");
        const handler = (event: KeyboardEvent) => setPressedKey(event.key);
        window.addEventListener("keypress", handler, true);
        return () => window.removeEventListener("keypress", handler);
    });

    return (
        <div>
            <div>Focus browser and start typing</div>
            <pre>{pressedKey} </pre>
        </div>
    )
};