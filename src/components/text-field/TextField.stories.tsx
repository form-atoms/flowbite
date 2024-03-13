import { textField } from "@form-atoms/field";

import { TextField } from "./TextField";
import { FormStory, meta, optionalField } from "../story-form";

export default {
  title: "TextField",
  ...meta,
};

const username = textField({
  schema: (s) => s.min(4),
});

export const Required: FormStory = {
  args: {
    fields: { username },
    children: ({ required }) => (
      <TextField field={username} label="User Name" required={required} />
    ),
  },
};

const nickname = textField({
  optionalSchema: (s) => s.min(4),
}).optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { nickname },
    children: () => <TextField field={nickname} label="Nick Name" />,
  },
};

const initial = textField();

export const Initialized: FormStory = {
  args: {
    fields: { initial },
    children: () => (
      <TextField field={initial} initialValue="Ferry Corsten" label="Artist" />
    ),
  },
};

const email = textField({
  schema: (s) => s.email(),
});

export const Email: FormStory = {
  args: {
    fields: { email },
    children: ({ required }) => (
      <TextField
        field={email}
        label="Email address"
        placeholder="example@email.com"
        helperText={
          <>
            We’ll never share your details. Read our{" "}
            <a
              href="/forms"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Privacy Policy
            </a>
            .
          </>
        }
        required={required}
      />
    ),
  },
};
