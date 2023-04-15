import {
  FieldProps,
  useCheckboxGroup,
  UseCheckboxGroupProps,
  ZodArrayField,
} from "@form-atoms/field";
import { Checkbox, HelperText, Label } from "flowbite-react";

import { FlowbiteField } from "../field";

export const CheckboxGroupField = <Option, Field extends ZodArrayField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  required,
  helperText,
  ...uiProps
}: UseCheckboxGroupProps<Option, Field> & FieldProps<Field>) => {
  const checkboxGroup = useCheckboxGroup({
    field,
    options,
    getValue,
    getLabel,
  });

  return (
    <FlowbiteField
      field={field}
      required={required}
      helperText={helperText}
      label={label}
    >
      {({ color, helperText, required: isInputRequired, ...fieldProps }) => {
        return (
          <>
            {checkboxGroup.map((checkboxProps) => (
              <div key={checkboxProps.id} className="flex gap-2">
                <Checkbox
                  role="checkbox"
                  {...uiProps}
                  {...fieldProps}
                  {...checkboxProps}
                />
                <Label htmlFor={checkboxProps.id}>{checkboxProps.label}</Label>
              </div>
            ))}
            {helperText && <HelperText color={color}>{helperText}</HelperText>}
          </>
        );
      }}
    </FlowbiteField>
  );
};
