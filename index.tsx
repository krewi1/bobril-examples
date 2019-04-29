import * as b from "bobril";
import {App} from "./context/paragraps-example/context";
import {App as AppTwo} from "./context/paragraph-example-refactor/context";
import {App as AppThree} from "./context/context-changing/context";

export enum Routes {
    CTX = "context",
    CTX_ONE = "context-one",
    CTX_TWO = "context-two",
}

const mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            { tag: "h1", children: "Examples" },
            {
                tag: "ul",
                children: [
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("Basic Context", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.CTX
                            )
                        ],
                    },
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("Refactor Context", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.CTX_ONE
                            )
                        ],
                    },
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("Change values", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.CTX_TWO
                            )
                        ],
                    },
                ],
            },
            { tag: "div", children: me.data.activeRouteHandler() },
        ];
    },
});

b.routes(b.route({ handler: mainPage }, [
    b.route({ url: makePath(Routes.CTX), name: Routes.CTX, handler: Wrapper }),
    b.route({ url: makePath(Routes.CTX_ONE), name: Routes.CTX_ONE, handler: WrapperOne }),
    b.route({ url: makePath(Routes.CTX_TWO), name: Routes.CTX_TWO, handler: WrapperTwo }),
]));

function makePath(route: Routes) {
    return `/${route}`
}

function Wrapper() {
    return <App/>;
}

function WrapperOne() {
    return <AppTwo/>;
}

function WrapperTwo() {
    return <AppThree/>;
}
