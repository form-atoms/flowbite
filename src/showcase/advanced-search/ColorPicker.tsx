import { stringArrayField } from "@form-atoms/field";
import { CheckboxGroupField } from "../../checkbox-group-field";

const Dot = ({ color }: { color: string }) => (
  <span
    className={`inline-block h-3.5 w-3.5 rounded-full border-2 border-white ${color} dark:border-gray-800`}
  />
);

const colors = [
  { name: "Blue", value: "bg-blue-400" },
  { name: "Gray", value: "bg-gray-400" },
  { name: "Green", value: "bg-green-400" },
  { name: "Pink", value: "bg-pink-400" },
  { name: "Red", value: "bg-red-400" },
];

export const color = stringArrayField();

export const ColorPicker = () => (
  <CheckboxGroupField
    required
    field={color}
    label="Color"
    options={colors}
    getValue={(color) => color.name}
    getLabel={(color) => (
      <>
        <Dot color={color.value} /> {color.name}
      </>
    )}
  />
);
