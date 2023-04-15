import { FormStory, meta } from "../../stories";
import { AdvancedSearch } from "./AdvancedSearch";

import { color } from "./ColorPicker";
import { usageCondition } from "./UsageCondition";
import { rating } from "./Rating";
import { productBrand } from "./ProductBrand";

export default {
  title: "showcase/AdvancedSearch",
  ...meta,
};

export const Primary: FormStory = {
  args: {
    fields: { productBrand, color, rating, usageCondition },
    children: () => <AdvancedSearch />,
  },
};
