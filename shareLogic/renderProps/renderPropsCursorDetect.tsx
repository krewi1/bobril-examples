import * as b from "bobril";
import { WrapperStyles } from "../hoc/styles";
import { normalizeCoords } from "../common/normalizeCoords";
import { OffsetInfo } from "../naiveCursorDetect";

export interface Position {
    x: number;
    y: number;
}

export interface IData {
    render: (position: Position) => b.IBobrilChildren;
}

export class DynamicCursorDetectComponent extends b.Component<IData> {
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

    render(data): b.IBobrilChildren {
        return <div style={WrapperStyles}>{data.render(this.position)}</div>;
    }
}
