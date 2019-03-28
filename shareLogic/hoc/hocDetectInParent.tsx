import * as b from "bobril";
import {OffsetInfo, Position} from "../naiveCursorDetect";
import { ComponentOnPosition } from "../componentOnPosition";
import {normalizeCoords} from "../common/normalizeCoords";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type WithoutPosition<T extends Position> = Omit<T, "x"|"y">

export function hocDetectCursor<T extends Position>(Component: b.IComponentFactory<T>) {
    return class HocDetectInParent extends b.Component<WithoutPosition<T>> {
        position: Position;
        offset: OffsetInfo;

        constructor() {
            super();
            this.position = {
                x: 0,
                y: 0
            };
            this.offset = {
                x: 0,
                y: 0,
                maxX: 0,
                maxY: 0
            };
        }

        postInitDom(me: b.IBobrilCacheNode): void {
            const element = b.getDomNode(me) as HTMLElement;
            const bounding = element.getBoundingClientRect();
            this.offset = {
                x: bounding.left,
                y: bounding.top,
                maxX: bounding.width,
                maxY: bounding.height,
            };
            this.recalculatePosition(this.position.x, this.position.y);
        }

        onMouseMove(event: b.IBobrilMouseEvent): b.GenericEventResult {
            const {x, y} = event;
            this.recalculatePosition(x, y);
            return b.EventResult.HandledPreventDefault;
        }

        recalculatePosition(x: number, y: number) {
            const {maxY, maxX, x: offsetX, y: offsetY} = this.offset;

            this.position = {
                x: normalizeCoords(maxX, x - offsetX),
                y : normalizeCoords(maxY, y - offsetY)
            };
            b.invalidate(this);
        }

        render(data) {
            const {x, y} = this.position;
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Component x={x} y={y} {...data}>
                        {data.children}
                    </Component>
                </div>
            )
        }
    }
}

export const TestComponent = hocDetectCursor(ComponentOnPosition);