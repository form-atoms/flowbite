import { stringArrayField } from "@form-atoms/field";
import { CheckboxGroupField } from "../../components";

const Dot = ({ color }: { color: string }) => (
  <span
    className={`inline-block h-3.5 w-3.5 rounded-full border-2 border-white ${color} dark:border-gray-800`}
  />
);

const colors = [
  { name: "Blue", colorClass: "bg-blue-400" },
  { name: "Gray", colorClass: "bg-gray-400" },
  { name: "Green", colorClass: "bg-green-400" },
  { name: "Pink", colorClass: "bg-pink-400" },
  { name: "Red", colorClass: "bg-red-400" },
];

export const color = stringArrayField().optional();

export const ColorPicker = () => (
  <CheckboxGroupField
    field={color}
    label="Color"
    options={colors}
    getValue={(color) => color.name}
    getLabel={(color) => (
      <>
        <Dot color={color.colorClass} /> {color.name}
      </>
    )}
  />
);
