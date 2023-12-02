import {
  CheckboxField,
  FieldProps,
  useCheckboxFieldProps,
  useRequiredProps,
} from "@form-atoms/field";
import { HelperText, Label, Radio } from "flowbite-react";
import { useAtomValue } from "jotai";

import { useFieldError } from "../../hooks";
import { RequiredIndicator } from "../required-indicator";

export const RadioOption = <Field extends CheckboxField>({
  field,
  required,
  label,
  helperText,
}: FieldProps<Field>) => {
  const id = `${field}`;
  const props = useCheckboxFieldProps(field);
  const { error } = useFieldError(field);
  const requiredProps = useRequiredProps({ field, required });
  const atom = useAtomValue(field);
  const isFieldRequired = useAtomValue(atom.required);

  return (
    <div className="flex items-center gap-2">
      <Radio {...props} id={id} {...requiredProps} role="radio" />
      <div className="flex flex-col">
        <Label htmlFor={id} color={error ? "failure" : undefined}>
          <>
            {label}
            {isFieldRequired ? <RequiredIndicator /> : ""}
          </>
        </Label>
        <HelperText
          className="mt-0 text-xs"
          color={error ? "failure" : undefined}
        >
          {error ?? helperText}
        </HelperText>
      </div>
    </div>
  );
};
