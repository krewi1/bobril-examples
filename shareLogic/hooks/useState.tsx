import * as b from "bobril";
import { normalizeCoords } from "../common/normalizeCoords";

export function useElementOffset(ref?: HTMLElement) {
    const [offsetTop, setOffsetTop] = b.useState(0);
    const [offsetLeft, setOffsetLeft] = b.useState(0);
    const [maxX, setMaxX] = b.useState(0);
    const [maxY, setMaxY] = b.useState(0);

    b.useLayoutEffect(() => {
        if (ref) {
            const bounding = ref.getBoundingClientRect();
            setOffsetTop(bounding.top);
            setOffsetLeft(bounding.left);
            setMaxX(bounding.width);
            setMaxY(bounding.height);
        }
    }, [ref]);

    return [offsetTop, offsetLeft, maxY, maxX];

}

export class UseState extends b.Component<{}> {
    element?: HTMLElement;
    postInitDom(me: b.IBobrilCacheNode): void {
        this.element = b.getDomNode(me) as HTMLElement
    }

    render() {
        const [offsetTop, offsetLeft, maxY, maxX] = useElementOffset(this.element);
        const [xPosition, setXPosition] = b.useState(0);
        const [yPosition, setYPosition] = b.useState(0);
        return (
            <div style={{width: "300px", height: "300px", position: "relative"}} onMouseMove={(event: any) => {
                setXPosition(normalizeCoords(maxX, event.x - offsetLeft));
                setYPosition(normalizeCoords(maxY, event.y - offsetTop));
                return true;
            }}>
                <div style={{position: "absolute", top: yPosition, left: xPosition}}>Rendered item</div>
            </div>
        )
    }
}