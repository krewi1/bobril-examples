import * as b from "bobril";

export const PureObject: b.IBobrilNode = {
    tag: "div",
    children: "Hello world",
};

export const PureObjectWithoutTag: b.IBobrilNode = {
    children: "Hello world",
};

export const PureVirtualObjectWithChild: b.IBobrilNode = {
    children: {
        tag: "div",
        children: "hello world from child",
    },
};

export const BobrilComponentNaive: b.IBobrilNode = {
    tag: "div",
    component: {
        render: function(ctx, me) {
            me.children = `Hello world`;
        },
    },
};

export interface IBobrilDynamic {
    name: string;
}

export const BobrilStaticData: b.IBobrilNode = {
    tag: "div",
    component: {
        render: function(ctx, me) {
            me.children = `Hello ${ctx.data.name}`;
        },
    },
    data: {
        name: "krewi",
    },
};

export const BobrilComponentDynamic: (data: IBobrilDynamic) => b.IBobrilNode<IBobrilDynamic> = data => {
    return {
        tag: "div",
        component: {
            render: function(ctx, me) {
                me.children = `Hello ${ctx.data.name}`;
            },
        },
        data: data,
    };
};

export const BobrilComponentDynamicGeneric = <T>(component: b.IBobrilNode<T>) => (data: T) => {
    return {
        ...component,
        data: data,
    };
};
