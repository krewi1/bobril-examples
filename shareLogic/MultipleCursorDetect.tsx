import * as b from "bobril"

import { DynamicCursorDetectComponent } from "./renderProps/renderPropsCursorDetect";
import { ComponentOnPosition } from "./componentOnPosition";

export function DynamicCursorDetect() {
    return [
        <DynamicCursorDetectComponent render={position => (
            <>
                <ComponentOnPosition x={position.x} y={position.y}>
                    Tom
                </ComponentOnPosition>
                <ComponentOnPosition x={position.x - 10} y={position.y - 10}>
                    Jerry
                </ComponentOnPosition>
            </>
        )}/>
    ]
}