import * as b from "bobril";

function useElementOffset(ref?: HTMLElement) {
    const [offsetTop, setOffsetTop] = b.useState(0);
    const [offsetLeft, setOffsetLeft] = b.useState(0);

    b.useLayoutEffect(() => {
        if (ref) {
            const bounding = ref.getBoundingClientRect();
            setOffsetTop(bounding.top);
            setOffsetLeft(bounding.left);
        }
    }, [ref]);

    return [offsetTop, offsetLeft];

}

export const UseState = b.component(class UseStateClazz extends b.Component<{}> {
    element?: HTMLElement;
    postInitDom(me: b.IBobrilCacheNode): void {
        this.element = b.getDomNode(me) as HTMLElement
    }

    render() {
        const [offsetTop, offsetLeft] = useElementOffset(this.element);
        const [xPosition, setXPosition] = b.useState(0);
        const [yPosition, setYPosition] = b.useState(0);
        return (
            <div style={{width: "300px", height: "300px", position: "relative"}} onMouseMove={(event: any) => {
                setXPosition(event.x - offsetLeft);
                setYPosition(event.y - offsetTop);
            }}>
                <div style={{position: "absolute", top: yPosition, left: xPosition}}>Rendered item</div>
            </div>
        )
    }
});