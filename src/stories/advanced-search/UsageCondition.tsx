import { stringField } from "@form-atoms/field";
import { PropsWithChildren } from "react";

import { RadioField } from "../../components";

const Container = ({ children }: PropsWithChildren) => (
  <ul className="w-full items-center rounded-lg border border-gray-200 bg-white py-3 text-sm font-medium text-gray-900 sm:flex dark:border-gray-600 dark:bg-gray-700 dark:text-white">
    {children}
  </ul>
);

const RadioItem = ({ children }: PropsWithChildren) => (
  <li className="w-full pl-3 capitalize dark:border-gray-600"> {children}</li>
);

export const usageCondition = stringField().optional();

const options = ["all", "new", "used"];

export const UsageCondition = () => (
  <RadioField
    field={usageCondition}
    label="Condition"
    options={options}
    getValue={(opt) => opt}
    getLabel={(opt) => opt}
    Container={Container}
    Option={RadioItem}
  />
);
