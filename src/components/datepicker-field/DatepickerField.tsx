import { DateFieldProps, useDateFieldProps } from "@form-atoms/field";
import { Datepicker, DatepickerProps } from "flowbite-react";

import { FlowbiteField } from "../field";

type DatepickerFIeldProps = DateFieldProps &
  Omit<DatepickerProps, "onSelectedDateChanged">;

export const DatepickerField = ({
  field,
  label,
  helperText,
  required,
  initialValue,
  ...uiProps
}: DatepickerFIeldProps) => {
  const {
    // TODO(flowbite-react/Datepicker): support forwardRef
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
    value,
    onChange,
    ...dateFieldProps
  } = useDateFieldProps(field, {
    initialValue,
  });

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        <Datepicker
          {...dateFieldProps}
          {...uiProps}
          {...fieldProps}
          defaultDate={value}
          onSelectedDateChanged={(valueAsDate) => {
            onChange({
              // @ts-expect-error fake event
              currentTarget: { valueAsDate },
            });
          }}
        />
      )}
    </FlowbiteField>
  );
};
