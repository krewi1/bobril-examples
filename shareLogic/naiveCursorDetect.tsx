import * as b from "bobril";

export interface Position {
    x: number;
    y: number;
}

class NaiveCursorDetect extends b.Component<{}> {
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

    render(data: {}): b.IBobrilChildren {
        return (
            <div style={{width: "500px", height: "500px"}}>
                {this.position.x}
                {this.position.y}
            </div>
        )
    }
}

export const NaiveCursorDetectComponent = b.component(NaiveCursorDetect);
