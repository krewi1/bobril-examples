import * as b from "bobril";
import { NaiveCursorDetectComponent } from "./naiveCursorDetect";
import { NaiveCursorDetectWCHComponent } from "./naiveCursorDetectWithChildren";
import { TestComponent } from "./hoc/hocDetectInParent";

export const ShareLogic = () => {
    return [
        NaiveCursorDetectComponent(),
        NaiveCursorDetectWCHComponent(),
        b.styledDiv(<TestComponent>Ahoj</TestComponent>, {
            width: "500px",
            height: "500px"
        })
    ];
};