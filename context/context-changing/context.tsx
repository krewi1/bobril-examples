import * as b from "bobril";
import { StyleContext, StyleProvider } from "./styleContext";
import { EventResult } from "bobril";

export function App(this: b.IBobrilCtx) {
    return <Section />;
}

class StyleContextProvider extends b.Component {
    color = "yellow";
    padding = "5px";

    changeColor = (color: string) => {
        this.color = color;
        b.invalidate(this);
        return EventResult.HandledPreventDefault;
    };

    render() {
        return (
            <StyleProvider
                value={{
                    color: this.color,
                    padding: this.padding,
                    changeColor: this.changeColor,
                }}
            >
                <Paragraph />
            </StyleProvider>
        );
    }
}

function Section() {
    return (
        <div>
            <StyleContextProvider />
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

interface ISentenceData {
    children: string;
}

function Sentence(data: ISentenceData) {
    const { changeColor, ...rest } = b.useContext(StyleContext);
    return (
        <div>
            <div style={{ ...rest }}>{data.children}</div>
            <button
                onClick={() =>
                    changeColor(["red", "purple", "yellow", "green", "brown"][Math.floor(Math.random() * 5)])
                }
            >
                change color
            </button>
        </div>
    );
}
