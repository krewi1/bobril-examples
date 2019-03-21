import * as b from "bobril";

export interface Position {
    x: number;
    y: number;
}

export interface IData {
    render: (position: Position) => b.IBobrilChildren;
}

class DynamicCursorDetect extends b.Component<IData> {
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

    render(data): b.IBobrilChildren {
        return (
            <div style={{width: "500px", height: "500px"}}>
                {data.render(this.position)}
            </div>
        )
    }
}

export const DynamicCursorDetectComponent = b.component(DynamicCursorDetect);
