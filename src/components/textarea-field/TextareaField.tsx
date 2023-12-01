import { TextFieldProps, useTextFieldProps } from "@form-atoms/field";
import { Textarea, TextareaProps } from "flowbite-react";

import { InputColors } from "../../hooks";
import { FlowbiteField } from "../field";

type FlowbiteTextFieldProps = TextFieldProps &
  TextareaProps & { colors?: InputColors };

export const TextareaField = ({
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
        <Textarea
          role="textbox"
          {...props}
          value={props.value ?? ""}
          {...uiProps}
          {...fieldProps}
        />
      )}
    </FlowbiteField>
  );
};
