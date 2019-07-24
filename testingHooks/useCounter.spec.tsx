import * as b from 'bobril';
import { useCounter } from "./useCounter";
import { useInterval } from "./useInterval";
import { useMeter } from "./useDomMeasure";

interface IHookRender<T, P extends any[]> {
    bobrilNode: {current: b.IBobrilCacheNode};
    element: Element;
    currentValue: T
    changeDependencies(...dependencies: P): void;
    afterEffect(): Promise<void>;
    afterLayoutEffect(): Promise<void>;
}

function renderHook<T, P extends any[]>(hook: (...args: P) => T, ...dependencies: P): Promise<IHookRender<T, P>> {
    return new Promise(resolve => {
        let currentValue: T = {} as T;
        let deps = dependencies;
        let afterEffect = () => undefined;
        let afterLayoutEffect = () => undefined;
        let domNode: HTMLDivElement;
        function Component() {
            const cacheNode = b.useRef<b.IBobrilCacheNode>();
            Object.assign(currentValue, hook(...deps));
            b.useLayoutEffect(() => {
                domNode = b.getDomNode(cacheNode.current) as HTMLDivElement;
                resolve({
                    bobrilNode: cacheNode,
                    element: domNode,
                    currentValue,
                    changeDependencies(...dependencies: P) {
                        deps = dependencies;
                        rerender();
                    },
                    afterEffect(): Promise<void> {
                        return new Promise<void>(resolve => afterEffect = resolve)
                    },
                    afterLayoutEffect(): Promise<void> {
                        return new Promise<void>(resolve => afterLayoutEffect = resolve)
                    }
                });
                b.invalidate()
            }, []);
            b.useLayoutEffect(() => {
                afterLayoutEffect();
            });
            b.useEffect(() => afterEffect());
            return <div ref={cacheNode}>test</div>
        }

        b.init(() => {
            return <div><Component/></div>
        });
        b.syncUpdate();
    })

}

export function rerender() {
    b.invalidate();
    b.syncUpdate();
}

export function clean() {
    b.removeRoot("0");
}

describe("useCounter", () => {
    it("testing hook", async () => {
        const container = await renderHook(useCounter);

        expect(container.currentValue.count).toBe(0);

        container.currentValue.increment();
        rerender();
        expect(container.currentValue.count).toBe(1);
    });

    it("with params", async () => {
        const container = await renderHook(useCounter, 6);

        expect(container.currentValue.count).toBe(6);
        container.currentValue.increment();
        rerender();
        expect(container.currentValue.count).toBe(7);
    });
});

describe("useInterval", () => {
    let clock: jasmine.Clock;
    beforeEach(() => {
        clock = jasmine.clock();
        clock.install();
    });
    it("call callback after timeout", async () => {
        const spy = jasmine.createSpy("testFunction");
        const container = await renderHook(useInterval, spy, 500);
        await container.afterEffect();
        clock.tick(501);
        expect(spy).toHaveBeenCalled();
    });

    it("call correct callback when changed", async () => {
        const spy = jasmine.createSpy("testFunction");
        const container = await renderHook(useInterval, spy, 500);

        await container.afterEffect();
        const spyTwo = jasmine.createSpy("testFunction2");
        container.changeDependencies(spyTwo, 500);
        await container.afterEffect();

        clock.tick(501);
        expect(spy).not.toHaveBeenCalled();
        expect(spyTwo).toHaveBeenCalled();
    });

    it("change time", async () => {
        const spy = jasmine.createSpy("testFunction");
        const container = await renderHook(useInterval, spy, 500);
        await container.afterEffect();
        clock.tick(499);
        expect(spy).not.toHaveBeenCalled();
        container.changeDependencies(spy, 300);
        await container.afterEffect();

        clock.tick(200);
        expect(spy).not.toHaveBeenCalled();

        clock.tick(101);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        clock.uninstall();
    })
});

describe("domMeter", () => {
    it("can measure dom", async () => {
        const measureContainer = {
            bottom: 8,
            left: 4,
            right: 6,
            top: 2,
            width: 2,
            height: 6
        };
        const container = await renderHook(useMeter, {current: null});
        await container.afterLayoutEffect();
        container.changeDependencies(container.bobrilNode);
        spyOn(container.element, "getBoundingClientRect").and.returnValue(measureContainer);
        await container.afterLayoutEffect();
        expect(container.currentValue.bottom).toBe(8);
        expect(container.currentValue.left).toBe(4);
        expect(container.currentValue.right).toBe(6);
        expect(container.currentValue.top).toBe(2);
        expect(container.currentValue.width).toBe(2);
        expect(container.currentValue.height).toBe(6);
    });

    afterEach(() => clean())
});