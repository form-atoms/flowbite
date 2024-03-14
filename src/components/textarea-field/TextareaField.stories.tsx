import { textField } from "@form-atoms/field";

import { TextareaField } from "./TextareaField";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "TextareaField",
  ...meta,
};

const bio = textField();

export const Required: FormStory = {
  args: {
    fields: { bio },
    children: ({ required }) => (
      <TextareaField field={bio} label="Biography" required={required} />
    ),
  },
};

const comment = textField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { comment },
    children: () => <TextareaField field={comment} label="Comment" />,
  },
};

const initial = textField();

export const Initialized: FormStory = {
  args: {
    fields: { initial },
    children: () => (
      <TextareaField
        field={initial}
        label="Comment"
        initialValue="Live love laugh"
      />
    ),
  },
};
