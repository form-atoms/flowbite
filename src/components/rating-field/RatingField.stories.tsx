import { numberField } from "@form-atoms/field";

import { RatingField } from "./RatingField";
import { FormStory, meta, optionalField } from "../story-form";

export default {
  title: "RatingField",
  ...meta,
};

const fields = {
  rating: numberField(),
};

export const Required: FormStory = {
  args: {
    fields,
    children: ({ required }) => (
      <RatingField
        field={fields.rating}
        label="Rate your experience"
        required={required}
      />
    ),
  },
};

const optionalRating = numberField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { optionalRating },
    children: () => (
      <RatingField field={optionalRating} label="Rate your experience" />
    ),
  },
};

const initial = numberField();

export const Initialized: FormStory = {
  ...optionalField,
  args: {
    fields: { initial },
    children: () => (
      <RatingField
        field={initial}
        initialValue={4}
        label="Rate your experience"
      />
    ),
  },
};
