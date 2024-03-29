import { checkboxField } from "@form-atoms/field";

import { CheckboxField } from "./CheckboxField";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "CheckboxField",
  ...meta,
};

const termsOfService = checkboxField();

export const Required: FormStory = {
  args: {
    fields: { termsOfService },
    children: ({ required }) => (
      <CheckboxField
        field={termsOfService}
        label="Terms of Service"
        helperText="Better read those"
        required={required}
      />
    ),
  },
};

const subscribeToNewsletter = checkboxField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { subscribeToNewsletter },
    children: () => (
      <CheckboxField
        field={subscribeToNewsletter}
        label="Subscribe to the newsletter"
        helperText="Get the latest news 👍"
      />
    ),
  },
};

const imGoing = checkboxField();

export const Initialized: FormStory = {
  ...optionalField,
  args: {
    fields: { imGoing },
    children: () => (
      <CheckboxField
        field={imGoing}
        initialValue={true}
        label="I'm going"
        helperText="Oh yes 👍"
      />
    ),
  },
};
