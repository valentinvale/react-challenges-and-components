import { createContext, useContext } from "react";

export const TextFieldContext = createContext<string | undefined>(undefined);

export function useTextFieldContext() {
    const id = useContext(TextFieldContext);
    if (id === undefined) {
        throw new Error("TextField components must be used within a TextField");
    }
    return id;
}