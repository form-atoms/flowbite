import { listField, textField } from "@form-atoms/field";

import { ReviewList } from "./ReviewList";
import { formStory, meta } from "../story-form";

export default {
  title: "showcase/ReviewList",
  ...meta,
};

const fields = {
  positives: listField({
    value: [{ item: "quality materials used" }, { item: "waterproof" }],
    fields: () => ({ item: textField() }),
  }),
  negatives: listField({
    value: [{ item: "could be lighter" }],
    fields: () => ({ item: textField() }),
  }),
};

export const Primary = formStory({
  args: {
    fields,
    children: ({ fields }) => <ReviewList fields={fields} />,
  },
});
