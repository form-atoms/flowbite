import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import { RangeSlider, RangeSliderProps } from "flowbite-react";

import { FlowbiteField, type WithHelperText } from "../field";

export type SliderFieldProps = NumberFieldProps &
  RangeSliderProps &
  WithHelperText;

export const SliderField = ({
  field,
  label,
  required,
  helperText,
  initialValue,
  ...inputProps
}: SliderFieldProps) => {
  const props = useNumberFieldProps(field, { initialValue });

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {(fieldProps) => (
        <>
          <RangeSlider {...props} {...inputProps} {...fieldProps} />
        </>
      )}
    </FlowbiteField>
  );
};
