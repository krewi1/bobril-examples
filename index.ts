import * as b from "bobril";
import { Components } from "./components/index";

const mainPage = b.createComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = [
            { tag: "h1", children: "Examples" },
            {
                tag: "ul",
                children: [
                    {
                        tag: "li",
                        children: b.link(
                            b.styledDiv("components", { cursor: "pointer", textDecoration: "underline" }),
                            "components"
                        ),
                    },
                ],
            },
            { tag: "div", children: me.data.activeRouteHandler() },
        ];
    },
});

b.routes(b.route({ handler: mainPage }, [b.route({ url: "/components", name: "components", handler: Components })]));
