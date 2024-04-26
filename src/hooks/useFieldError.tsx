import type { FlowbiteStateColors } from "flowbite-react";
import { FieldAtom, useFieldState } from "form-atoms";

export type InputColors = (keyof FlowbiteStateColors)[];

export type FlowbiteStateColor = keyof FlowbiteStateColors;

export const useFieldError = (
  field: FieldAtom<any>,
  colors: InputColors = ["failure"],
) => {
  const { validateStatus, errors, touched } = useFieldState(field);
  const color =
    validateStatus === "invalid"
      ? "failure"
      : validateStatus === "valid"
        ? "success"
        : undefined;

  return {
    color:
      color && touched
        ? colors.includes(color)
          ? (color as FlowbiteStateColor)
          : undefined
        : undefined,
    error: errors[0],
    errors,
  };
};
