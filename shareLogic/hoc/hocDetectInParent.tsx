import * as b from "bobril";
import { Position } from "../naiveCursorDetect";
import { ComponentOnPosition } from "../componentOnPosition";

export function hocDetectCursor<T extends Position>(TempComponent: b.IComponentFactory<T>): b.IComponentFactory<{}> {
    return b.component(class HocDetectInParent extends b.Component<{}> {
        position: Position;
        offset: Position;

        constructor() {
            super();
            this.position = {
                x: 0,
                y: 0
            };
            this.offset = {
                x: 0,
                y: 0
            };
        }

        postInitDom(me: b.IBobrilCacheNode): void {
            const element = b.getDomNode(me) as HTMLElement;
            const bounding = element.getBoundingClientRect();
            this.position = {
                x: bounding.left,
                y: bounding.top
            };
            this.offset = {
                x: bounding.left,
                y: bounding.top
            }
        }

        onMouseMove(event: b.IBobrilMouseEvent): b.GenericEventResult {
            const {x, y} = event;
            this.position = {
                x,
                y
            };
            b.invalidate(this);
            return b.EventResult.HandledPreventDefault;
        }

        render(data) {
            const Component = TempComponent as any;
            const {x, y} = this.position;
            const xWithoutOffset = x - this.offset.x;
            const yWithoutOffset = y - this.offset.y;
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Component x={xWithoutOffset} y={yWithoutOffset}>
                        {data.children}
                    </Component>
                </div>
            )
        }
    })
}

export const TestComponent = hocDetectCursor(ComponentOnPosition);