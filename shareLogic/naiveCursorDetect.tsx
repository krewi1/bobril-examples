import * as b from "bobril";
import { WrapperStyles } from "./hoc/styles";
import { normalizeCoords } from "./common/normalizeCoords";

export interface Position {
    x: number;
    y: number;
}

export interface OffsetInfo extends Position {
    maxX: number;
    maxY: number;
}

export class NaiveCursorDetectComponent extends b.Component<{}> {
    position: Position;
    offset: OffsetInfo;

    constructor() {
        super();
        this.position = {
            x: 0,
            y: 0,
        };
        this.offset = {
            x: 0,
            y: 0,
            maxX: 0,
            maxY: 0,
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
        b.invalidate(this);
    }

    onMouseMove(event: b.IBobrilMouseEvent): b.GenericEventResult {
        const { x, y } = event;

        this.recalculatePosition(x, y);
        return b.EventResult.HandledPreventDefault;
    }

    private recalculatePosition(x: number, y: number) {
        const { maxY, maxX, x: offsetX, y: offsetY } = this.offset;

        this.position = {
            x: normalizeCoords(maxX, x - offsetX),
            y: normalizeCoords(maxY, y - offsetY),
        };
        b.invalidate(this);
    }

    render(data: {}): b.IBobrilChildren {
        const { x, y } = this.position;
        return (
            <div>
                <h2>Naive cursor detection</h2>
                <div style={WrapperStyles}>
                    <div>x: {x}</div>
                    <div>y: {y}</div>
                </div>
            </div>
        );
    }
}
