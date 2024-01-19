import { numberField } from "@form-atoms/field";
import { z } from "zod";

import { SliderField } from "./SliderField";
import { FormStory, meta, optionalField } from "../story-form";

export default {
  title: "SliderField",
  ...meta,
};

const confidence = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Required: FormStory = {
  args: {
    fields: { confidence },
    children: ({ required }) => (
      <SliderField
        min={0}
        max={100}
        field={confidence}
        label="Confidence"
        required={required}
      />
    ),
  },
};

const optional = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
}).optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { confidence: optional },
    children: () => (
      <SliderField min={0} max={100} field={optional} label="Confidence" />
    ),
  },
};

const initial = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
}).optional();

export const Initialized: FormStory = {
  args: {
    fields: { confidence: initial },
    children: () => (
      <SliderField
        min={0}
        max={100}
        initialValue={80}
        field={initial}
        label="Confidence"
      />
    ),
  },
};
