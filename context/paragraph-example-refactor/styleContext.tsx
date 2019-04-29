import * as b from "bobril";

export const StyleContext = b.createContext({
    color: "red",
    padding: "5x",
});

interface IStyleContext {
    color: string;
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
