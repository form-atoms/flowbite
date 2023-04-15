import { FormStory, meta } from "../../components/story-form";
import { AdvancedSearch } from "./AdvancedSearch";

import { color } from "./ColorPicker";
import { usageCondition } from "./UsageCondition";
import { rating } from "./Rating";
import { productBrand } from "./ProductBrand";
import { priceMax, priceMin } from "./PriceRange";

export default {
  title: "showcase/AdvancedSearch",
  ...meta,
};

export const Primary: FormStory = {
  args: {
    fields: { productBrand, priceMax, priceMin, color, rating, usageCondition },
    children: () => <AdvancedSearch />,
  },
};
