import { stringArrayField } from "@form-atoms/field";

import { CheckboxGroupField } from "./CheckboxGroupField";
import { getLabel, getValue, options } from "./languages";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "CheckboxGroupField",
  ...meta,
};

const proficientLanguages = stringArrayField();

export const Required: FormStory = {
  args: {
    fields: { proficientLanguages },
    children: ({ required }) => (
      <CheckboxGroupField
        field={proficientLanguages}
        label="What programming languages are you proficient?"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
        required={required}
      />
    ),
  },
};

const optionalLanguages = stringArrayField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optionalLanguages },
    children: () => (
      <CheckboxGroupField
        field={optionalLanguages}
        label="What programming languages are you proficient?"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};

const langs = stringArrayField();

export const Initialized: FormStory = {
  ...optionalField,
  args: {
    fields: { langs },
    children: () => (
      <CheckboxGroupField
        field={langs}
        initialValue={["css", "ts", "react"]}
        label="What programming languages are you proficient?"
        options={options}
        getValue={getValue}
        getLabel={getLabel}
      />
    ),
  },
};
