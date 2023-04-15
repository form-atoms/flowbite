import { numberField } from "@form-atoms/field";
import { NumberField } from "../../number-field";

export const priceMin = numberField({ optional: true });
export const priceMax = numberField({ optional: true });

export const PriceRange = () => (
  <div className="flex gap-3">
    <NumberField field={priceMin} label="From" />
    <NumberField field={priceMax} label="To" />
  </div>
);
