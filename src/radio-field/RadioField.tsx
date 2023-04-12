import {
  RadioGroupProps,
  useOptions,
  SelectField,
  useSelectFieldProps,
  FieldProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { RenderProp } from "react-render-prop-type";
import { FlowbiteField } from "../field";
import { Fragment, PropsWithChildren } from "react";

export const RadioField = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
  required,
  Container = Fragment,
  RadioItem = Fragment,
  ...uiProps
}: RadioGroupProps<Option, Field> &
  Omit<FieldProps<Field>, "field"> &
  Partial<
    RenderProp<PropsWithChildren, "Container"> &
      RenderProp<PropsWithChildren, "RadioItem">
  >) => {
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
        <Container>
          {renderOptions.map(({ id, value, label }) => (
            <RadioItem key={id}>
              <div className="flex items-center gap-2">
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
            </RadioItem>
          ))}
          {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </Container>
      )}
    </FlowbiteField>
  );
};
