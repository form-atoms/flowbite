import {
  UseCheckboxGroupProps,
  ZodArrayField,
  useCheckboxGroup,
} from "@form-atoms/field";
import { Checkbox, HelperText, Label } from "flowbite-react";

import { Option as BaseOption, type OptionRenderProp } from "../";
import { FlowbiteField, type FlowbiteFieldProps } from "../field";

export type CheckboxGroupFieldProps<
  Option,
  Field extends ZodArrayField,
> = FlowbiteFieldProps<Field> &
  UseCheckboxGroupProps<Option, Field> &
  Partial<OptionRenderProp>;

export const CheckboxGroupField = <Option, Field extends ZodArrayField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  required,
  helperText,
  initialValue,
  Option = BaseOption,
  ...uiProps
}: CheckboxGroupFieldProps<Option, Field>) => {
  const checkboxGroup = useCheckboxGroup(
    {
      field,
      options,
      getValue,
      getLabel,
    },
    { initialValue },
  );

  return (
    <FlowbiteField
      field={field}
      required={required}
      helperText={helperText}
      label={label}
    >
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ color, helperText, required: isInputRequired, ...fieldProps }) => {
          return (
            <>
              {checkboxGroup.map((checkboxProps) => (
                <Option key={checkboxProps.id}>
                  <Checkbox
                    role="checkbox"
                    {...uiProps}
                    {...fieldProps}
                    {...checkboxProps}
                  />
                  <Label htmlFor={checkboxProps.id}>
                    {checkboxProps.label}
                  </Label>
                </Option>
              ))}
              {helperText && (
                <HelperText color={color}>{helperText}</HelperText>
              )}
            </>
          );
        }
      }
    </FlowbiteField>
  );
};
