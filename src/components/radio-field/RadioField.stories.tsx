import { RadioField } from "./RadioField";
import { country, getLabel, getValue, options } from "../select-field/country";
import { FormStory, meta, optionalField } from "../story-form";
import { stringField } from "@form-atoms/field";

export default {
  title: "RadioField",
  ...meta,
};

export const Required: FormStory = {
  args: {
    fields: { country },
    children: ({ required }) => (
      <RadioField
        field={country}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
        required={required}
      />
    ),
  },
};

const optional = stringField({ optional: true });

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { country: optional },
    children: () => (
      <RadioField
        field={optional}
        label="Country of Origin"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
