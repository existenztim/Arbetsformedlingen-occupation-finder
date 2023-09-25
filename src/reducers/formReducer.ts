import { useReducer } from "react";
import { IFormState } from "../models/IFormState";

type Action =
  | {
      type: "changed_headline" | "changed_description" | "set_error";
      payload: string;
      error?: Error;
    }
  | { type: "fetching_data" | "fetched_data"; payload?: boolean }
  | { type: "failed_validation"; payload: IFormState["validationErrors"] };

export function useForm() {
  return useReducer(reducer, {
    headline: "",
    description: "",
    error: "",
    loading: false,
    validationErrors: {
      headline: "",
      description: "",
    },
  });
}

export function reducer(state: IFormState, action: Action): IFormState {
  console.log("Action incoming", action);
  const { type, payload } = action;
  switch (type) {
    case "changed_headline":
      return { ...state, headline: payload };

    case "changed_description":
      return { ...state, description: payload };

    case "set_error":
      return { ...state, error: payload };

    case "fetching_data":
      return {
        ...state,
        loading: true,
        error: "",
        validationErrors: { headline: "", description: "" },
      };

    case "fetched_data":
      return { ...state, loading: false };

    case "failed_validation":
      return { ...state, validationErrors: payload };

    default:
      return state;
  }
}
