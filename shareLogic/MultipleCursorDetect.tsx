import * as b from "bobril"

import { DynamicCursorDetectComponent } from "./renderProps/renderPropsCursorDetect";
import { ComponentOnPosition } from "./componentOnPosition";

export const DynamicCursorDetect = b.component(()  => {
    return (
        <div>
            <h2>Render props</h2>
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
        </div>
    )
});