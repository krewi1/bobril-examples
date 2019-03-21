import * as b from "bobril";
import { NaiveCursorDetectComponent } from "./naiveCursorDetect";
import { NaiveCursorDetectWCHComponent } from "./naiveCursorDetectWithChildren";
import { TestComponent } from "./hoc/hocDetectInParent";

export const ShareLogic = () => {
    return b.styledDiv([
        <NaiveCursorDetectComponent/>,
        <NaiveCursorDetectWCHComponent/>,
        b.styledDiv(<TestComponent>Ahoj</TestComponent>, {
            position: "relative",
            width: "500px",
            height: "500px"
        })
    ], {display: "flex", justifyContent: "space-between"});
};