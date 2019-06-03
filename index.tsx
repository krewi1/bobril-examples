import * as b from "bobril";
import {App as AppTwo} from "./context/paragraph-example-refactor/context";
import {App as AppThree} from "./context/context-changing/context";
import { RenderLocalized } from "./localization/index";
import { ChatPage } from "./chat/index";

export enum Routes {
    CTX = "context",
    CTX_ONE = "context-one",
    CTX_TWO = "context-two",
    LOCALIZE = "localization",
}

const mainPage = b.createVirtualComponent({
    render(_ctx: b.IBobrilCtx, me: b.IBobrilNode): void {
        me.children = <Wrapper/>
    }
});

b.routes(b.route({ handler: mainPage }, [
    b.route({ url: makePath(Routes.CTX), name: Routes.CTX, handler: Wrapper }),
    b.route({ url: makePath(Routes.CTX_ONE), name: Routes.CTX_ONE, handler: WrapperOne }),
    b.route({ url: makePath(Routes.CTX_TWO), name: Routes.CTX_TWO, handler: WrapperTwo }),
    b.route({ url: makePath(Routes.LOCALIZE), name: Routes.LOCALIZE, handler: AnotherWrapper }),
]));

function makePath(route: Routes) {
    return `/${route}`
}

function Wrapper() {
    return <ChatPage/>;
}

function WrapperOne() {
    return <AppTwo/>;
}

function WrapperTwo() {
    return <AppThree/>;
}

function AnotherWrapper() {
    return <RenderLocalized/>;
}
