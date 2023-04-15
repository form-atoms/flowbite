import { numberField } from "@form-atoms/field";
import { RadioField } from "../../";
import { Rating } from "flowbite-react";

export const rating = numberField({ optional: true });

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
          <Rating.Star key={index} filled={index < val} />
        ))}
      </Rating>
    )}
  />
);