import * as b from "bobril";
import {Position} from "./naiveCursorDetect"

type IData = Position & {z: string}

export function ComponentOnPosition(data: IData, children: b.IBobrilChildren) {
    console.log(data.z);
    return (
        b.styledDiv(children, {
            position: "absolute",
            top: data.y,
            left: data.x
        })
    )
}