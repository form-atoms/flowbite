import {
  RadioGroupProps,
  SelectField,
  useOptions,
  useSelectFieldProps,
} from "@form-atoms/field";
import { Label, Radio } from "flowbite-react";
import { Fragment, PropsWithChildren } from "react";
import { RenderProp } from "react-render-prop-type";

import {
  Option as BaseOption,
  FlowbiteField,
  FlowbiteFieldProps,
  type OptionRenderProp,
} from "../";

type ContainerProp = RenderProp<PropsWithChildren, "Container">;

export type RadioFieldProps<
  Option,
  Field extends SelectField,
> = FlowbiteFieldProps<Field> &
  RadioGroupProps<Option, Field> &
  Partial<ContainerProp & OptionRenderProp>;

export const RadioField = <Option, Field extends SelectField>({
  field,
  options,
  getValue,
  getLabel,
  label,
  helperText,
  required,
  initialValue,
  Container = Fragment,
  Option = BaseOption,
  ...uiProps
}: RadioFieldProps<Option, Field>) => {
  const props = useSelectFieldProps(
    { field, options, getValue },
    { initialValue },
  );
  const { renderOptions } = useOptions({ field, options, getLabel });

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ color, id: fieldId, ...fieldProps }) => (
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
        </Container>
      )}
    </FlowbiteField>
  );
};
