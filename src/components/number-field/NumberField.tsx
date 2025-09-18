import {
  type NumberField as TNumberField,
  useNumberFieldProps,
} from "@form-atoms/field";
import { TextInput, TextInputProps } from "flowbite-react";

import { FlowbiteField, FlowbiteFieldProps } from "../field";

export const NumberField = ({
  label,
  field,
  helperText,
  required,
  initialValue,
  ...inputProps
}: FlowbiteFieldProps<TNumberField> & TextInputProps) => {
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
