import { PropsWithChildren } from "react";
import { RadioField } from "../../radio-field";
import { stringField } from "@form-atoms/field";

const Container = ({ children }: PropsWithChildren) => (
  <ul className="w-full items-center rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
    {children}
  </ul>
);

const RadioItem = ({ children }: PropsWithChildren) => (
  <li className="w-full pl-3 capitalize dark:border-gray-600"> {children}</li>
);

export const usageCondition = stringField({ optional: true });

const options = ["all", "new", "used"];

export const UsageCondition = () => (
  <RadioField
    field={usageCondition}
    label="Condition"
    options={options}
    getValue={(opt) => opt}
    getLabel={(opt) => opt}
    Container={Container}
    RadioItem={RadioItem}
  />
);
