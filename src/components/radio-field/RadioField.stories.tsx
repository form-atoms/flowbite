import { stringField } from "@form-atoms/field";

import { RadioField } from "./RadioField";
import { FormStory, meta, optionalField } from "../../stories/story-form";
import { country, getLabel, getValue, options } from "../select-field/country";

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

const optional = stringField().optional();

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

const initialized = stringField();

export const Initialized: FormStory = {
  args: {
    fields: { country: initialized },
    children: () => (
      <RadioField
        field={initialized}
        label="Country of Origin"
        options={options}
        initialValue="CZ"
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
