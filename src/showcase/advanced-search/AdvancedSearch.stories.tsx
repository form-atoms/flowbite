import { FormStory, meta } from "../../stories";
import { AdvancedSearch } from "./AdvancedSearch";

import { color } from "./ColorPicker";
import { usageCondition } from "./UsageCondition";
import { rating } from "./Rating";

export default {
  title: "showcase/AdvancedSearch",
  ...meta,
};

export const Primary: FormStory = {
  args: {
    fields: { color, rating, usageCondition },
    children: () => <AdvancedSearch />,
  },
};
