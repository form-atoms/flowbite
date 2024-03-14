import { listField, textField } from "@form-atoms/field";

import { ReviewList } from "./ReviewList";
import { formStory, meta } from "../story-form";

export default {
  title: "showcase/ReviewList",
  ...meta,
};

const fields = {
  positives: listField({
    value: ["quality materials used", "waterproof"],
    builder: (value) => textField({ value }),
  }),
  negatives: listField({
    value: ["could be lighter"],
    builder: (value) => textField({ value }),
  }),
};

export const Primary = formStory({
  args: {
    fields,
    children: ({ fields }) => <ReviewList fields={fields} />,
  },
});
