import {
  FieldProps,
  RequiredProps,
  ZodField,
  useRequiredProps,
} from "@form-atoms/field";
import { Label } from "flowbite-react";
import { ReactNode } from "react";
import { RenderProp } from "react-render-prop-type";

import { FlowbiteStateColor, useFieldError } from "../hooks";

type Children = RenderProp<
  Omit<RequiredProps, "isFieldRequired"> & {
    id: string;
    helperText: ReactNode;
    color?: FlowbiteStateColor;
  }
>;

type FlowbiteFieldProps<Field extends ZodField<any, any>> = FieldProps<Field> &
  Children;

export const FlowbiteField = <Field extends ZodField<any, any>>({
  field,
  required,
  label,
  children,
  ...uiProps
}: FlowbiteFieldProps<Field>) => {
  const id = `${field}`;
  const { color, error } = useFieldError(field);
  const { isFieldRequired, ...props } = useRequiredProps(field, required);

  const helperText = uiProps.helperText ?? error;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label color={color} htmlFor={id}>
          {label} {isFieldRequired ? "(required)" : ""}
        </Label>
      )}
      {children({ ...props, id, helperText, color })}
    </div>
  );
};
