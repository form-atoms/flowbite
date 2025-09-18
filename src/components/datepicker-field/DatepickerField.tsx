import { DateFieldProps, useDateFieldProps } from "@form-atoms/field";
import { Datepicker, DatepickerProps } from "flowbite-react";
import type { DatepickerRef } from "flowbite-react/dist/components/Datepicker/Datepicker";
import { useEffect, useRef } from "react";

import { FlowbiteField, WithHelperText } from "../field";

type DatepickerFIeldProps = DateFieldProps &
  Omit<DatepickerProps, "onSelectedDateChanged"> & WithHelperText;

export const DatepickerField = ({
  field,
  label,
  helperText,
  required,
  initialValue,
  placeholder = "Please select a date",
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
  const datepickerRef = useRef<DatepickerRef>(null);

  useEffect(() => {
    if (initialValue && value === initialValue) {
      datepickerRef.current?.clear();
    }
  }, [value]);

  const emptyProps = !value
    ? {
        value: "",
        placeholder,
      }
    : {};

  return (
    <FlowbiteField
      field={field}
      label={label}
      required={required}
      helperText={helperText}
    >
      {(fieldProps) => (
        // @ts-expect-error emptyProps hack to reset value
        <Datepicker
          ref={datepickerRef}
          {...dateFieldProps}
          {...uiProps}
          {...fieldProps}
          {...emptyProps}
          defaultValue={value}
          onChange={(valueAsDate) => {
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
