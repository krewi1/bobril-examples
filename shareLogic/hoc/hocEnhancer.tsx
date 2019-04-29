import * as b from "bobril";

interface ComponentData<T> {
    data: Promise<T>;
}

export function hocEnhancer<T extends object>(Component: b.IComponentFactory<T>) {
    return class HocDetectInParent extends b.Component<ComponentData<T>> {
        loading: boolean;
        loadedData: T | null;

        constructor() {
            super();
            this.loading = true;
            this.loadedData = null;
        }

        init() {
            this.data.data.then(data => this.dataLoaded(data));
        }

        dataLoaded(incomeData: T) {
            this.loading = false;
            this.loadedData = incomeData;
            b.invalidate(this);
        }
        render() {
            if (this.loading) {
                return <div>Loading...</div>;
            }
            return (
                <div>
                    <h2>HOC Enhancer</h2>
                    <Component {...this.loadedData} />
                </div>
            );
        }
    };
}

interface DataForComponent {
    text: string;
}

export class UseEnhancer extends b.Component<{}> {
    render(data) {
        const PromiseResolveAfterTime = new Promise<DataForComponent>(resolve => {
            setTimeout(() => resolve({ text: "This will be rendered after timeout" }), 5000);
        });
        return <TestComponentEnhancer data={PromiseResolveAfterTime} />;
    }
}

export const TestComponentEnhancer = hocEnhancer((data: DataForComponent) => <div>{data.text}</div>);
