import * as b from "bobril";
import { createTransformer, observable } from "bobx";

export function Bobx(): b.IBobrilNode {
    return <Test />;
}

enum Severity {
    Warning,
    Error,
    Ok
}

interface ValidationInfo {
    severity: Severity,
    message?: string;
}

interface Validator<T> {
    (value: T): ValidationInfo;
}

export function validate<T>(...validators: Validator<T>[]): (value: T) => ValidationInfo[] {
    return (value: T) => {
        return validators.map((validator) => validator(value));
    }
}

function isNotTen(value: number): ValidationInfo {
    const valid = value !== 10;
    return {
        severity: valid ? Severity.Ok : Severity.Error,
        message: valid ? undefined : "can not be 10"
    }
}

function isNotTwelve(value: number): ValidationInfo {
    const valid = value !== 12;
    return {
        severity: valid ? Severity.Ok : Severity.Error,
        message: valid ? undefined : "can not be 10"
    }
}

const TestStore = {
    name: "Test",
    testArray: [9],
    counter: {
        count: 9
    }
};

class TestClassStore {
    @observable
    name= "Test";
    @observable
    testArray= [9];
    @observable
    counter = {
        count: 9
    }
}

const Test = () => {
    const [store, error] = b.useStore(() => createStore(TestStore, {
        testArray: validate(isNotTen),
        counter: {
            count: validate(isNotTen)
        }
    }));

    const [store1, error1] = b.useStore(() => createStore(new TestClassStore(), {
        testArray: validate(isNotTen),
        counter: {
            count: validate(isNotTen)
        }
    }));

    const validationsStore = error.counter.count[0] && error.counter.count[0].message;
    const validationsArr = error.testArray[0] && error.testArray[0][0].message;

    return (
        <div>
            <button onClick={() => {
                store.counter.count = store.counter.count + 1;
                store.testArray[0] = store.testArray[0] + 1;
            }}>+</button>
            <button onClick={() => {
                store.counter.count = store.counter.count - 1;
                store.testArray[0] = store.testArray[0] - 1;
            }}>-
            </button>
            <div>{store.counter.count}</div>
            <div>{validationsStore}</div>
            <div>{store.testArray[0]}</div>
            <div>{validationsArr}</div>
        </div>
    )
};

export type RecursiveValidators<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? U extends object
            ? RecursiveValidators<U>
            : (prop: U) => ValidationInfo[]
        : T[P] extends object
            ? RecursiveValidators<T[P]>
            : (prop: T[P]) => ValidationInfo[]
};

export type RecursiveUndefined<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? U extends object
            ? RecursiveValidators<U>
            : ValidationInfo[]
        : T[P] extends object
            ? RecursiveValidators<T[P]>
            : ValidationInfo[]
}

function createStore<T>(object: T, validation: RecursiveValidators<T> = {}): [T, RecursiveUndefined<T>] {
    const error = {} as RecursiveUndefined<T>;
    const store = {} as T;

    function forRecursion<T1>(target: T1, store: T1, error: RecursiveUndefined<T1>, validator: RecursiveValidators<T1> = {}){
        Object.keys(target).forEach((key) => {
            const prop = target[key];

            if (Array.isArray(prop)) {
                const observedProp = observable(prop);
                let computed;
                if (validator[key]) {
                    computed = createTransformer(function(value: any) {
                        return validator[key](value, object)
                    });
                }
                Object.defineProperty(store, key, {
                    get: () => {
                        return observedProp;
                    }
                });
                Object.defineProperty(error, key, {
                    get: () => {
                        return observedProp.map((value) => computed(value))
                    }
                })
            } else if (typeof prop === "object" && prop !== null) {
                const objStore = {};
                const errorStore = {};
                forRecursion(prop, objStore, errorStore, validator[key]);
                store[key] = objStore;
                error[key] = errorStore;
            } else {
                const observedProp = observable(prop);
                let computed;
                if (validator[key]) {
                    computed = createTransformer(function(value: any) {
                        return validator[key](value, object)
                    });
                }
                Object.defineProperty(store, key, {
                    get: () => {
                        return observedProp.get();
                    },
                    set(value: any): void {
                        observedProp.set(value);
                    }
                });
                Object.defineProperty(error, key, {
                    get: () => {
                        if (computed) {
                            return computed(store[key]);
                        }
                        return ""
                    }
                })
            }
         });
    }
    forRecursion(object, store, error, validation);
    return [
        store,
        error
    ]
}