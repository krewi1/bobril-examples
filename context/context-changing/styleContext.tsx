import * as b from "bobril";
import { EventResult, GenericEventResult } from "bobril";

export const StyleContext = b.createContext<IStyleContext>({
    color: "red",
    changeColor: () => EventResult.NotHandled,
    padding: "5x",
});

interface IStyleContext {
    color: string;
    changeColor: (color: string) => GenericEventResult;
    padding: string;
}

export interface IStyleData {
    value: IStyleContext;
    children: b.IBobrilNode;
}

export function StyleProvider(data: IStyleData) {
    b.useProvideContext(StyleContext, data.value);

    return <>{data.children}</>;
}

export interface IConsumerData {
    children: (context: IStyleContext) => b.IBobrilNode;
}

export function StyleConsumer(data: IConsumerData) {
    const context = b.useContext(StyleContext);
    return data.children(context);
}
