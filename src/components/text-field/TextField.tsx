import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { TextInput, TextInputProps } from "flowbite-react";

import { InputColors } from "../../hooks";
import { FlowbiteField } from "../field";

type FlowbiteTextFieldProps = TextFieldProps &
  TextInputProps & { colors?: InputColors };

export const TextField = ({
  label,
  field,
  helperText,
  required,
  initialValue,
  ...uiProps
}: FlowbiteTextFieldProps) => {
  const props = useTextFieldProps(field, { initialValue });

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => (
        <TextInput
          role="textbox"
          type="text"
          {...props}
          {...uiProps}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
