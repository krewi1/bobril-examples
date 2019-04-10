import * as b from "bobril";
import { Components } from "./components/index";
import { ShareLogic } from "./shareLogic/index";
import { ShareLogicHooks } from "./shareLogic/hooks";
import {Bobx} from "./bobx/basic";

export enum Routes {
    COMPONENTS = "components",
    SHARE_LOGIC = "share-logic",
    SHARE_LOGIC_HOOKS = "hooks",
    BOBX = "bobx",
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
                                b.styledDiv("components", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.COMPONENTS
                            )
                        ],
                    },
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("Share logic", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.SHARE_LOGIC
                            )
                        ],
                    },
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("Share logic with hooks", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.SHARE_LOGIC_HOOKS
                            )
                        ],
                    },
                    {
                        tag: "li",
                        children: [
                            b.link(
                                b.styledDiv("bobx", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.BOBX
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
    b.route({ url: makePath(Routes.COMPONENTS), name: Routes.COMPONENTS, handler: Components }),
    b.route({ url: makePath(Routes.SHARE_LOGIC), name: Routes.SHARE_LOGIC, handler: ShareLogic }),
    b.route({ url: makePath(Routes.SHARE_LOGIC_HOOKS), name: Routes.SHARE_LOGIC_HOOKS, handler: ShareLogicHooks }),
    b.route({ url: makePath(Routes.BOBX), name: Routes.BOBX, handler: Bobx }),
]));

function makePath(route: Routes) {
    return `/${route}`
}
