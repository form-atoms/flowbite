import { ColorPicker } from "./ColorPicker";
import { PriceRange } from "./PriceRange";
import { ProductBrand } from "./ProductBrand";
import { RatingRadioField } from "./Rating";
import { UsageCondition } from "./UsageCondition";

export const AdvancedSearch = () => (
  <>
    <ProductBrand />
    <UsageCondition />
    <PriceRange />
    <ColorPicker />
    <RatingRadioField />
  </>
);
