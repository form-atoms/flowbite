import { ColorPicker } from "./ColorPicker";
import { ProductBrand } from "./ProductBrand";
import { RatingRadioField } from "./Rating";
import { UsageCondition } from "./UsageCondition";

export const AdvancedSearch = () => (
  <>
    <ProductBrand />
    <UsageCondition />
    <ColorPicker />
    <RatingRadioField />
  </>
);
