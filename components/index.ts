import { Counter } from "./counterCreateComponent";
import {
    BobrilComponentDynamic,
    BobrilComponentDynamicGeneric,
    BobrilComponentNaive,
    BobrilStaticData,
    PureObject,
    PureObjectWithoutTag,
    PureVirtualObjectWithChild,
} from "./counterPureObject";
import { CounterClass } from "./counterClass";

export const Components = () => {
    return [
        PureObject,
        PureObjectWithoutTag,
        PureVirtualObjectWithChild,
        BobrilComponentNaive,
        BobrilStaticData,
        BobrilComponentDynamic({ name: "krewi" }),
        Counter(),
        CounterClass(),
    ];
};
