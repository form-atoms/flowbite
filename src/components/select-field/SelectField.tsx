import {
  useSelectFieldProps,
  SelectProps,
  useSelectOptions,
  SelectField as SelectZodField,
} from "@form-atoms/field";
import { Select, SelectProps as FlowbiteSelectProps } from "flowbite-react";
import { ReactNode } from "react";

import { FlowbiteField } from "../field";

export const SelectField = <Option, Field extends SelectZodField>({
  field,
  options,
  getValue,
  getLabel,
  placeholder,
  label,
  helperText,
  required,
  ...uiProps
}: SelectProps<Option, Field> &
  FlowbiteSelectProps & { label?: ReactNode }) => {
  // @ts-ignore
  const props = useSelectFieldProps({ field, options, getValue });
  const { selectOptions } = useSelectOptions({
    field,
    options,
    getLabel,
    placeholder,
  });

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        <Select role="combobox" {...uiProps} {...props} {...fieldProps}>
          {selectOptions}
        </Select>
      )}
    </FlowbiteField>
  );
};
