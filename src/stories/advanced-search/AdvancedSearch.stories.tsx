import { AdvancedSearch } from "./AdvancedSearch";
import { color } from "./ColorPicker";
import { priceMax, priceMin } from "./PriceRange";
import { productBrand } from "./ProductBrand";
import { rating } from "./Rating";
import { usageCondition } from "./UsageCondition";
import { FormStory, meta } from "../story-form";

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
