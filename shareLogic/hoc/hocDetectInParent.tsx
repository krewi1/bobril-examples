import * as b from "bobril";
import { Position } from "../naiveCursorDetect";
import { ComponentOnPosition } from "../componentOnPosition";

export function hocDetectCursor<T extends Position>(TempComponent: b.IComponentFactory<T>): b.IComponentFactory<{}> {
    return b.component(class HocDetectInParent extends b.Component<{}> {
        position: Position;

        constructor() {
            super();
            this.position = {
                x: 0,
                y: 0
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
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <TempComponent x={this.position.x} y={this.position.y}/>
                </div>
            )
        }
    })
}

export const TestComponent = hocDetectCursor(ComponentOnPosition);