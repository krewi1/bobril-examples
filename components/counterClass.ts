import * as b from "bobril";
import { Button } from "./counterCreateComponent";

class CounterClazz extends b.Component<never> {
    count: number = 0;
    timeoutId: number;
    postInitDom(): void {
        this.timeoutId = setInterval(() => {
            this.increment();
        }, 1000);
    }
    destroy(): void {
        clearInterval(this.timeoutId);
    }

    increment() {
        this.count++;
        b.invalidate(this);
    }

    decrement() {
        this.count--;
        b.invalidate(this);
    }

    render(data: {}): b.IBobrilChildren {
        return [
            { tag: "h1", children: "Counter" },
            { tag: "div", children: this.count },
            Button({ title: "+", callback: () => this.increment() }),
            Button({ title: "-", callback: () => this.decrement() }),
        ];
    }
}

export const CounterClass = b.component(CounterClazz);
