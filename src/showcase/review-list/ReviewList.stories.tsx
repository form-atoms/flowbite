import { ReviewList, reviewItemBuilder } from "./ReviewList";
import { formStory, meta } from "../../components/story-form";

export default {
  title: "showcase/ReviewList",
  ...meta,
};

const fields = {
  positives: reviewItemBuilder(["quality materials used", "waterproof"]),
  negatives: reviewItemBuilder(["could be lighter"]),
};

export const Primary = formStory({
  args: {
    fields,
    children: ({ form }) => <ReviewList form={form} />,
  },
});
