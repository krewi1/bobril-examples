import * as b from "bobril";

export function Bobx() {
    const [count, setCount] = b.useState(0);
    b.useEffect(() => {
        console.log("efect");
        setInterval(() => {
            setCount((state) => state + 1)
        }, 1000);
    }, []);
    return count;
}