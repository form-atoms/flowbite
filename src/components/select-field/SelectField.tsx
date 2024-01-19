import {
  PlaceholderOption,
  SelectProps,
  SelectField as SelectZodField,
  useSelectFieldProps,
  useSelectOptions,
} from "@form-atoms/field";
import { SelectProps as FlowbiteSelectProps, Select } from "flowbite-react";

import { FlowbiteField } from "../field";

export type SelectFieldProps<
  Option,
  Field extends SelectZodField,
> = SelectProps<Option, Field> & FlowbiteSelectProps;

export const SelectField = <Option, Field extends SelectZodField>({
  field,
  options,
  getValue,
  getLabel,
  placeholder,
  label,
  helperText,
  required,
  initialValue,
  ...uiProps
}: SelectFieldProps<Option, Field>) => {
  const props = useSelectFieldProps(
    { field, options, getValue },
    { initialValue },
  );
  const { selectOptions } = useSelectOptions({
    field,
    options,
    getLabel,
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
          {placeholder && <PlaceholderOption>{placeholder}</PlaceholderOption>}
          {selectOptions}
        </Select>
      )}
    </FlowbiteField>
  );
};
