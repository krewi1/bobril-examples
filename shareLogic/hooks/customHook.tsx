import * as b from "bobril";
import { WrapperStyles } from "../hoc/styles";
import { ComponentOnPosition } from "../componentOnPosition";

function useCursorCoordinates(ref?: HTMLElement) {
    const [positionX, setPositionX] = b.useState(0);
    const [positionY, setPositionY] = b.useState(0);
    const [offsetX, setOffsetX] = b.useState(0);
    const [offsetY, setOffsetY] = b.useState(0);

    b.useLayoutEffect(() => {
        if (ref) {
            const bounding = ref.getBoundingClientRect();
            setOffsetX(bounding.left);
            setOffsetY(bounding.top);
        }
    }, [ref]);

    b.useEffect(
        () => {
            const handler = (event: MouseEvent) => {
                setPositionX(event.clientX - offsetX);
                setPositionY(event.clientY - offsetY);
            };
            if (ref) {
                ref.addEventListener("mousemove", handler, true);
                return () => ref.removeEventListener("mousemove", handler);
            }
            return null;
        },
        [ref, offsetX, offsetY]
    );

    return [positionX, positionY];
}

export const CustomHook = b.component(class CustomHookClazz extends b.Component<{}> {
    element?: HTMLElement;
    postInitDom(me: b.IBobrilCacheNode): void {
        this.element = b.getDomNode(me) as HTMLElement;
    }

    render(data: {}): b.IBobrilChildren {
        const [x, y] = useCursorCoordinates(this.element);

        return (
            <div style={WrapperStyles}>
                <ComponentOnPosition x={x} y={y}>
                    Wow i am using hook
                </ComponentOnPosition>
            </div>
        )
    }
});