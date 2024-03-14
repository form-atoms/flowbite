import { dateField } from "@form-atoms/field";

import { DatepickerField } from "./DatepickerField";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "DatepickerField",
  ...meta,
};

const birthday = dateField({
  schema: (s) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 15);

    return s.max(date);
  },
});

export const Required: FormStory = {
  args: {
    fields: { birthday },
    children: ({ required }) => (
      <DatepickerField
        field={birthday}
        label="Birthday"
        required={required}
        helperText="You must be at least 15 years old"
      />
    ),
  },
};

const optional = dateField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optional },
    children: () => <DatepickerField field={optional} label="Birthday" />,
  },
};

const initialized = dateField();

export const Initialized: FormStory = {
  args: {
    fields: { initialized },
    children: () => (
      <DatepickerField
        field={initialized}
        initialValue={new Date()}
        label="Birthday"
      />
    ),
  },
};
