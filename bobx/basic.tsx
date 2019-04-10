import * as b from "bobril";
import {observable} from "bobx";

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
    counter: {
        count: 9
    }
};

const Test = () => {
    const [store, error] = b.useStore(() => createStore(TestStore, {
        counter: {
            count: validate(isNotTen)
        }
    }));

    debugger;

    return (
        <div>
            <button onClick={() => store.counter.count = store.counter.count + 1}>+</button>
            <div>{store.counter.count}</div>
            <div>{error.counter.count}</div>
        </div>
    )
}

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
            : string | undefined
        : T[P] extends object
            ? RecursiveValidators<T[P]>
            : string | undefined
}


function createStore<T>(object: T, validation: RecursiveValidators<T> = {}): [T, RecursiveUndefined<T>] {
    const error = {} as RecursiveUndefined<T>;
    const store = {} as T;

    function forRecursion<T1>(target: T1, store: T1, error: RecursiveUndefined<T1>, validator: RecursiveValidators<T1> = {}){
        Object.keys(target).forEach((key) => {
            const prop = target[key];

            if (Array.isArray(prop)) {

            } else if (typeof prop === "object" && prop !== null) {
                const objStore = {};
                const errorStore = {};
                forRecursion(prop, objStore, errorStore, validator[key]);
                store[key] = objStore;
                error[key] = errorStore;
            } else {
                const observedProp = observable(prop);
                Object.defineProperty(store, key, {
                    get: () => {
                        debugger;
                        return observedProp.get();
                    },
                    set(value: any): void {
                        error[key] = validator[key](value);
                        observedProp.set(value);
                    }
                });
            }
         });
    }
    forRecursion(object, store, error, validation);
    return [
        store,
        error
    ]
}