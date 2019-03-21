import * as b from "bobril";
import {Position} from "./naiveCursorDetect"

export function ComponentOnPosition(data: Position, children: b.IBobrilChildren) {
    return (
        b.styledDiv(children, {
            position: "absolute",
            top: data.y,
            left: data.x
        })
    )
}