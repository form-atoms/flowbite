import { numberField } from "@form-atoms/field";
import { Rating, RatingStar } from "flowbite-react";

import { RadioField } from "../../components";

export const rating = numberField().optional();

const options = [5, 4, 3, 2, 1];

export const RatingRadioField = () => (
  <RadioField
    field={rating}
    label="Rating"
    options={options}
    getValue={(opt) => opt}
    getLabel={(val) => (
      <Rating>
        {options.map((_, index) => (
          <RatingStar key={index} filled={index < val} />
        ))}
      </Rating>
    )}
  />
);
