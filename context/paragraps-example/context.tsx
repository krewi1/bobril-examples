import * as b from "bobril";
import { StyleContext } from "./styleContext";

export function App(this: b.IBobrilCtx) {
    return <Section />;
}

function Section() {
    return (
        <div>
            <Paragraph /> // paragraph with default context
            <ParagraphWithYellowStyleContext />
            <ParagraphWithBlueStyleContext />
        </div>
    );
}

function Paragraph() {
    return (
        <div>
            <Sentence>I am styled with context</Sentence>
        </div>
    );
}

function ParagraphWithYellowStyleContext(this: b.IBobrilCtx) {
    b.useProvideContext(StyleContext, {
        color: "yellow",
        padding: "5px",
    });
    return (
        <div>
            <Sentence>I am styled with context</Sentence>
        </div>
    );
}

function ParagraphWithBlueStyleContext(this: b.IBobrilCtx) {
    b.useProvideContext(StyleContext, {
        color: "blue",
        padding: "5px",
    });
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
    const style = b.useContext(StyleContext);
    return <div style={style}>{data.children}</div>;
}
