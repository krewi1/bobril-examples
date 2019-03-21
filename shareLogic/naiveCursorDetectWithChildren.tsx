import * as b from "bobril";
import { ComponentOnPosition } from "./componentOnPosition";

export interface Position {
    x: number;
    y: number;
}

class NaiveCursorDetectWithChildren extends b.Component<{}> {
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
        debugger;
        this.position = {
            x,
            y
        };
        b.invalidate(this);
        return b.EventResult.HandledPreventDefault;
    }

    render(data: {}): b.IBobrilChildren {
        const {x, y} = this.position;
        const xWithoutOffset = x - this.offset.x;
        const yWithoutOffset = y - this.offset.y;
        return (
            <div style={{width: "500px", height: "500px", position: "relative"}}>
                <ComponentOnPosition x={xWithoutOffset} y={yWithoutOffset} >
                    Victim
                </ComponentOnPosition>
                <ComponentOnPosition x={xWithoutOffset - 10} y={yWithoutOffset - 10} >
                    Stalker
                </ComponentOnPosition>
            </div>
        )
    }
}

export const NaiveCursorDetectWCHComponent = b.component(NaiveCursorDetectWithChildren);
