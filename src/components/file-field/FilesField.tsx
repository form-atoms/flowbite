import {
  FileFieldProps,
  useClearFileInputEffect,
  useFilesFieldProps,
} from "@form-atoms/field";
import { FileInput, FileInputProps } from "flowbite-react";

import { FlowbiteField } from "../field";
import { InputColors } from "../hooks";

type FlowbiteFilesFieldProps = FileFieldProps &
  FileInputProps & { colors?: InputColors };

export const FilesField = ({
  label,
  field,
  helperText,
  colors,
  required,
  ...uiProps
}: FlowbiteFilesFieldProps) => {
  const { value, ...props } = useFilesFieldProps(field);
  useClearFileInputEffect(field);

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
