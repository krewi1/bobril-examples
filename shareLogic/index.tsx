import * as b from "bobril";
import { NaiveCursorDetectComponent } from "./naiveCursorDetect";
import { NaiveCursorDetectWCHComponent } from "./naiveCursorDetectWithChildren";
import { TestComponent } from "./hoc/hocDetectInParent";
import { WrapperStyles } from "./hoc/styles";
import { UseEnhancer } from "./hoc/hocEnhancer";
import { DynamicCursorDetect } from "./MultipleCursorDetect";

export const ShareLogic = () => {
    return [
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <NaiveCursorDetectComponent />,
            <div>
                <h2>Naive implementation vol 2</h2>
                <NaiveCursorDetectWCHComponent />
            </div>
            ,
            <DynamicCursorDetect />,
        </div>,
        <div>
            <h2>HOC Injector</h2>
            <div style={WrapperStyles}>
                <TestComponent>Ahoj</TestComponent>
            </div>
            ,
        </div>,
        <UseEnhancer />,
    ];
};
