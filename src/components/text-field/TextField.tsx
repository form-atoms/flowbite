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
  ...uiProps
}: FlowbiteTextFieldProps) => {
  const props = useTextFieldProps(field);

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
          value={props.value ?? ""}
          {...uiProps}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
