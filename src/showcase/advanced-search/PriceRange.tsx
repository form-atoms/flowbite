import { numberField } from "@form-atoms/field";
import { NumberField } from "../../";

export const priceMin = numberField().optional();
export const priceMax = numberField().optional();

export const PriceRange = () => (
  <div className="flex gap-3">
    <NumberField field={priceMin} label="From" />
    <NumberField field={priceMax} label="To" />
  </div>
);
