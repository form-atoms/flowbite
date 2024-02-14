import {
  FieldProps,
  RequiredProps,
  ZodField,
  useRequiredProps,
} from "@form-atoms/field";
import { Label } from "flowbite-react";
import { useAtomValue } from "jotai";
import { ReactNode, useId } from "react";
import { RenderProp } from "react-render-prop-type";

import { RequiredIndicator } from "../";
import { FlowbiteStateColor, useFieldError } from "../../hooks";

type ChildrenProp = RenderProp<
  Omit<RequiredProps, "isFieldRequired"> & {
    id: string;
    helperText: ReactNode;
    color?: FlowbiteStateColor;
  }
>;

export type FlowbiteFieldProps<Field extends ZodField> = FieldProps<Field> & {
  helperText?: ReactNode;
};

export const FlowbiteField = <Field extends ZodField>({
  field,
  required,
  label,
  children,
  ...uiProps
}: FlowbiteFieldProps<Field> & ChildrenProp) => {
  const id = useId();
  const { color, error } = useFieldError(field);
  const requiredProps = useRequiredProps({ field, required });
  const atom = useAtomValue(field);
  const isFieldRequired = useAtomValue(atom.required);

  const helperText = uiProps.helperText ?? error;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label color={color} htmlFor={id}>
          <span>{label}</span>
          {isFieldRequired ? <RequiredIndicator /> : ""}
        </Label>
      )}
      {children({ ...requiredProps, id, helperText, color })}
    </div>
  );
};
