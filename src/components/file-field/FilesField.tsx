import {
  type FilesField as TFilesField,
  useFilesFieldProps,
} from "@form-atoms/field";
import { FileInput, FileInputProps } from "flowbite-react";

import { InputColors } from "../../hooks";
import { FlowbiteField, FlowbiteFieldProps } from "../field";

type FlowbiteFilesFieldProps = FlowbiteFieldProps<TFilesField> &
  FileInputProps & { colors?: InputColors };

export const FilesField = ({
  label,
  field,
  helperText,
  required,
  ...uiProps
}: FlowbiteFilesFieldProps) => {
  const props = useFilesFieldProps(field);

  return (
    <FlowbiteField
      field={field}
      required={required}
      helperText={helperText}
      label={label}
    >
      {(fieldProps) => (
        <FileInput role="dialog" {...props} {...uiProps} {...fieldProps} />
      )}
    </FlowbiteField>
  );
};
