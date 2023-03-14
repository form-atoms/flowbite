import { country, getLabel, getValue, options } from "./country";
import { SelectField } from "./SelectField";
import { FormStory, meta, optionalField } from "../stories";
import { stringField } from "@form-atoms/field";

export default {
  title: "SelectField",
  ...meta,
};

export const Required: FormStory = {
  args: {
    fields: { country },
    children: ({ required }) => (
      <SelectField
        field={country}
        label="Country of Origin"
        placeholder="Click to pick a country"
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
      <SelectField
        field={optional}
        label="Country of Origin"
        placeholder="Click to pick a country"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
