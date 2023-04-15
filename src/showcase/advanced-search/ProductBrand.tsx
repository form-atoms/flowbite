import { stringField } from "@form-atoms/field";
import { SelectField } from "../../";

export const productBrand = stringField({ optional: true });

const options = [
  { value: "apple", label: "Apple" },
  { value: "lg", label: "LG" },
  { value: "samsung", label: "Samsung" },
  { value: "lenovo", label: "Lenovo" },
  { value: "logitech", label: "Logitech" },
];

export const ProductBrand = () => (
  <SelectField
    field={productBrand}
    label="Product Brand"
    options={options}
    getValue={({ value }) => value}
    getLabel={({ label }) => label}
  />
);
