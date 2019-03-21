import * as b from "bobril";
import { ComponentOnPosition } from "./componentOnPosition";

export interface Position {
    x: number;
    y: number;
}

class NaiveCursorDetectWithChildren extends b.Component<{}> {
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
        debugger;
        this.position = {
            x,
            y
        };
        b.invalidate(this);
        return b.EventResult.HandledPreventDefault;
    }

    render(data: {}): b.IBobrilChildren {
        return (
            <div style={{width: "500px", height: "500px", position: "relative"}}>
                <ComponentOnPosition x={this.position.x} y={this.position.y} >
                    Victim
                </ComponentOnPosition>
                <ComponentOnPosition x={this.position.x - 10} y={this.position.y - 10} >
                    Stalker
                </ComponentOnPosition>
            </div>
        )
    }
}

export const NaiveCursorDetectWCHComponent = b.component(NaiveCursorDetectWithChildren);
