import { dateField } from "@form-atoms/field";

import { DatepickerField } from "./DatepickerField";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "DatepickerField",
  ...meta,
};

const dueDate = dateField({
  schema: (s) => {
    return s.min(new Date());
  },
});

export const Required: FormStory = {
  args: {
    fields: { dueDate },
    children: ({ required }) => (
      <DatepickerField
        field={dueDate}
        label="Due Date"
        required={required}
        helperText="Event must be in the future"
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
        initialValue={new Date(2024, 2, 31)}
        label="Birthday"
      />
    ),
  },
};
