import * as b from "bobril";
import { UseState } from "./hooks/useState";
import { UseEffect } from "./hooks/useEffect";
import { CustomHook } from "./hooks/customHook";
import { UseEffectWithDeps } from "./hooks/useEffectWithDeps";
import { UseEffectNotWorking } from "./hooks/useEffectNotWorking";
import { UseEffectWorking } from "./hooks/useEffectWorking";

export const ShareLogicHooks = () => {
    return [
        <UseState />,
        <UseEffect />,
        // UNCOMMENT FOR TEST IT
        <UseEffectWithDeps />,
        <UseEffectNotWorking />,
        <UseEffectWorking />,
        <CustomHook />,
    ];
};
