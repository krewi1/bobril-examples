import * as b from "bobril";
import { NaiveCursorDetectComponent } from "./naiveCursorDetect";
import { NaiveCursorDetectWCHComponent } from "./naiveCursorDetectWithChildren";
import { TestComponent } from "./hoc/hocDetectInParent";
import {WrapperStyles} from "./hoc/styles";
import {UseEnhancer} from "./hoc/hocEnhancer";
import {DynamicCursorDetect} from "./MultipleCursorDetect";

export const ShareLogic = () => {
    return [
        b.styledDiv([
            <NaiveCursorDetectComponent/>,
            <NaiveCursorDetectWCHComponent/>,
            b.styledDiv(<TestComponent>Ahoj</TestComponent>, WrapperStyles)
        ], {display: "flex", justifyContent: "space-between"}),
        <DynamicCursorDetect/>,
        <UseEnhancer/>
        ]
};