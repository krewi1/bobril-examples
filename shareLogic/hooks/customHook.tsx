import * as b from "bobril";
import { WrapperStyles } from "../hoc/styles";
import { ComponentOnPosition } from "../componentOnPosition";
import { normalizeCoords } from "../common/normalizeCoords";
import { useElementOffset } from "./useState";

function useCursorCoordinates(ref?: HTMLElement) {
    const [positionX, setPositionX] = b.useState(0);
    const [positionY, setPositionY] = b.useState(0);
    const [offsetY, offsetX, maxX, maxY] = useElementOffset(ref);

    b.useEffect(() => {
        const handler = (event: MouseEvent) => {
            setPositionX(normalizeCoords(maxX, event.clientX - offsetX));
            setPositionY(normalizeCoords(maxY, event.clientY - offsetY));
        };
        if (ref) {
            ref.addEventListener("mousemove", handler, true);
            return () => ref.removeEventListener("mousemove", handler);
        }
        return null;
    }, [ref, offsetX, offsetY, maxX, maxY]);

    return [positionX, positionY];
}

export class CustomHook extends b.Component<{}> {
    element?: HTMLElement;
    postInitDom(me: b.IBobrilCacheNode): void {
        this.element = b.getDomNode(me) as HTMLElement;
        b.invalidate(this);
    }

    render(data: {}): b.IBobrilChildren {
        const [x, y] = useCursorCoordinates(this.element);

        return (
            <div style={WrapperStyles}>
                <ComponentOnPosition x={x} y={y}>
                    Wow i am using hook
                </ComponentOnPosition>
            </div>
        );
    }
}
