import * as b from "bobril";
import { StyleConsumer, StyleProvider } from "./styleContext";

export function App(this: b.IBobrilCtx) {
    return <Section />;
}

function Section() {
    return (
        <div>
            <Paragraph /> // paragraph with default context
            <StyleProvider value={{ color: "yellow", padding: "5px" }}>
                <Paragraph />
            </StyleProvider>
            <StyleProvider value={{ color: "blue", padding: "3px" }}>
                <Paragraph />
            </StyleProvider>
        </div>
    );
}

function Paragraph() {
    debugger;

    return (
        <div>
            <Sentence>I am styled with context</Sentence>
        </div>
    );
}

interface ISentenceData {
    children: string;
}

function Sentence(this: b.IBobrilCtx, data: ISentenceData) {
    return <StyleConsumer>{style => <div style={style}>{data.children}</div>}</StyleConsumer>;
}
Sentence["test"] = "blbost";
