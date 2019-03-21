import * as b from "bobril";

interface IContext extends b.IBobrilCtx {
    increment(): void;
    decrement(): void;
    count: number;
    timeoutId: number;
}

export const Counter = b.createComponent<IContext>({
    init(ctx: IContext) {
        ctx.increment = () => {
            ctx.count++;
            b.invalidate(ctx);
        };
        ctx.decrement = () => {
            ctx.count--;
            b.invalidate(ctx);
        };
        ctx.count = 0;
    },
    render(ctx: IContext, me: b.IBobrilNode): void {
        me.children = [
            { tag: "h1", children: "counter" },
            { tag: "div", children: ctx.count },
            Button({ title: "+", callback: () => ctx.increment() }),
            Button({ title: "-", callback: () => ctx.decrement() }),
        ];
    },
});

interface IBtnData {
    title: string;
    callback(): void;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IBtnData;
}

export const Button = b.createComponent<IBtnData>({
    onClick(ctx: IButtonCtx) {
        ctx.data.callback();
        return true;
    },
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        me.tag = "button";
        me.children = ctx.data.title;
    },
});
