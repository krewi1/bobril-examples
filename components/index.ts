import { Counter } from "./counterCreateComponent";
import {
    BobrilComponentDynamic,
    BobrilComponentDynamicGeneric,
    BobrilComponentNaive,
    BobrilStaticData, IBobrilDynamic,
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
        BobrilComponentDynamicGeneric<IBobrilDynamic>({
            tag: "div",
            component: {
                render: function(ctx, me) {
                    me.children = `Hello ${ctx.data.name}`;
                },
            },
        })({ name: "krewi" }),
        Counter(),
        CounterClass(),
    ];
};
