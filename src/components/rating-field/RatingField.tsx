import {
  NumberField,
  NumberFieldProps,
  useNumberFieldProps,
} from "@form-atoms/field";
import { HelperText, Rating, RatingProps } from "flowbite-react";
import { useFieldActions } from "form-atoms";

import { FlowbiteField, FlowbiteFieldProps } from "../field";

const options = [1, 2, 3, 4, 5];

export type RatingFieldProps = FlowbiteFieldProps<NumberField> &
  RatingProps &
  NumberFieldProps;

export const RatingField = ({
  field,
  size = "md",
  label,
  helperText,
  required,
  initialValue,
  ...uiProps
}: RatingFieldProps) => {
  const props = useNumberFieldProps(field, { initialValue });
  const actions = useFieldActions(field);

  return (
    <FlowbiteField
      field={field}
      required={required}
      label={label}
      helperText={helperText}
    >
      {({ color, helperText, ...fieldProps }) => (
        <>
          <Rating size={size} {...uiProps} {...fieldProps}>
            {options.map((value) => (
              <div key={value} onClick={() => actions.setValue(value)}>
                <Rating.Star
                  // @ts-expect-error https://github.com/form-atoms/field/issues/66
                  filled={props.value && value ? value <= props.value : false}
                />
              </div>
            ))}
          </Rating>
          {helperText && <HelperText color={color}>{helperText}</HelperText>}
        </>
      )}
    </FlowbiteField>
  );
};
