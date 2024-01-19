import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { TextInput, TextInputProps } from "flowbite-react";

import { FlowbiteField } from "../field";

export const NumberField = ({
  label,
  field,
  helperText,
  required,
  initialValue,
  ...inputProps
}: NumberFieldProps & TextInputProps) => {
  const props = useNumberFieldProps(field, { initialValue });

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        <TextInput
          role="spinbutton"
          type="number"
          {...inputProps}
          {...props}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
