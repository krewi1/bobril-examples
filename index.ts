import * as b from "bobril";
import { Components } from "./components/index";
import { ShareLogic } from "./shareLogic/index";

export enum Routes {
    COMPONENTS = "components",
    SHARE_LOGIC = "share-logic"
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
                            ),
                            b.link(
                                b.styledDiv("share-logic", { cursor: "pointer", textDecoration: "underline" }),
                                Routes.SHARE_LOGIC
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
]));

function makePath(route: Routes) {
    return `/${route}`
}
