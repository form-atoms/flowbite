import {
  RadioGroupProps,
  useOptions,
  SelectField,
  useSelectFieldProps,
  FieldProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";

import { FlowbiteField } from "../field";

export const RadioField = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
  required,
  ...uiProps
}: RadioGroupProps<Option, Field> & Omit<FieldProps<Field>, "field">) => {
  // @ts-ignore
  const props = useSelectFieldProps({ field, options, getValue });
  const { renderOptions } = useOptions({ field, options, getLabel });

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {({ color, helperText, id: fieldId, ...fieldProps }) => (
        <>
          {renderOptions.map(({ id, value, label }) => (
            <div className="flex items-center gap-2" key={id}>
              <Radio
                {...props}
                role="radio"
                {...uiProps}
                {...fieldProps}
                id={id}
                value={value}
                name={props.name ?? fieldId}
                checked={props.value === value}
                aria-checked={props.value === value}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
          {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </>
      )}
    </FlowbiteField>
  );
};
