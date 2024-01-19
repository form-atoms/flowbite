import { NumberFieldProps, useNumberFieldProps } from "@form-atoms/field";
import {
  HelperText,
  RangeSlider,
  RangeSliderProps,
  TextInputProps,
} from "flowbite-react";

import { FlowbiteField } from "../field";

export type SliderFieldProps = NumberFieldProps &
  RangeSliderProps &
  Pick<TextInputProps, "helperText">;

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
          {fieldProps.helperText && (
            <HelperText color={fieldProps.color}>
              {fieldProps.helperText}
            </HelperText>
          )}
        </>
      )}
    </FlowbiteField>
  );
};
