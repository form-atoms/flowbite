import {
  FieldProps,
  RadioGroupProps,
  SelectField,
  useOptions,
  useSelectFieldProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { Fragment, PropsWithChildren } from "react";
import { RenderProp } from "react-render-prop-type";

import {
  Option as BaseOption,
  FlowbiteField,
  type OptionRenderProp,
} from "../";

export const RadioField = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
  required,
  Container = Fragment,
  Option = BaseOption,
  ...uiProps
}: RadioGroupProps<Option, Field> &
  Omit<FieldProps<Field>, "field"> &
  Partial<RenderProp<PropsWithChildren, "Container"> & OptionRenderProp>) => {
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
        <Container>
          {renderOptions.map(({ id, value, label }) => (
            <Option key={id}>
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
            </Option>
          ))}
          {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </Container>
      )}
    </FlowbiteField>
  );
};
