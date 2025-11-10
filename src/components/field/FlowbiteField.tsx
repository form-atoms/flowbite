import { type ReactNode, useId } from "react";
import { useAtomValue } from "jotai";
import {
  FieldProps,
  RequiredProps,
  ZodField,
  useRequiredProps,
} from "@form-atoms/field";
import { HelperText, Label } from "flowbite-react";

import { type Prettify } from "../utils";
import { RequiredIndicator } from "../";
import { FlowbiteStateColor, useFieldError } from "../../hooks";

type ChildrenProps = Prettify<
  RequiredProps & {
    id: string;
    color?: FlowbiteStateColor;
  }
>;

export type WithHelperText = {
  helperText?: ReactNode;
};

export type FlowbiteFieldProps<Field extends ZodField> = Prettify<
  FieldProps<Field> & WithHelperText
>;

type Props<Field extends ZodField> = Prettify<
  FlowbiteFieldProps<Field> & {
    children: (props: ChildrenProps) => ReactNode;
  }
>;

export const FlowbiteField = <Field extends ZodField>({
  field,
  required,
  label,
  children,
  helperText,
}: Props<Field>) => {
  const id = useId();
  const { color, error } = useFieldError(field);
  const requiredProps = useRequiredProps({ field, required });
  const atom = useAtomValue(field);
  const isFieldRequired = useAtomValue(atom.required);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label color={color} htmlFor={id}>
          <span>{label}</span>
          {isFieldRequired ? <RequiredIndicator /> : ""}
        </Label>
      )}
      {children({ ...requiredProps, id, color })}
      {helperText && <HelperText>{helperText}</HelperText>}
      {error && <HelperText color={color}>{error}</HelperText>}
    </div>
  );
};
