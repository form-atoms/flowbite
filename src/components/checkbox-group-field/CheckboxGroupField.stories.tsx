import { CheckboxGroupField } from "./CheckboxGroupField";
import { getLabel, getValue, options } from "./languages";
import { FormStory, meta, optionalField } from "../story-form";
import { stringArrayField } from "@form-atoms/field";

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
