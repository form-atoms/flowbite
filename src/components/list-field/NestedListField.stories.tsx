import { numberField, textField } from "@form-atoms/field";
import { Button } from "flowbite-react";
import { Fragment } from "react";

import { ListField } from "./ListField";
import { NumberField } from "../number-field";
import { formStory, meta } from "../story-form";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

type Address = {
  city: string;
  street: string;
};

type Person = {
  age: number;
  name: string;
};

const personBuilder = (
  { name, age }: Person | undefined = {
    name: "",
    age: 0,
  }
) => ({
  name: textField({
    name: "name",
    value: name,
  }),
  age: numberField({
    name: "age",
    value: age,
  }),
});

const addressBuilder = (
  { city, street, people }: (Address & { people: Person[] }) | undefined = {
    city: "",
    street: "",
    people: [],
  }
) => ({
  city: textField({
    name: "city",
    value: city,
  }),
  street: textField({
    name: "street",
    value: street,
  }),
  people: [],
});

const fields = {
  addresses: [
    {
      city: textField({
        name: "city",
        value: "Bratislava",
      }),
      street: textField({
        name: "street",
        value: "Kosicka",
      }),
      people: [
        {
          name: textField({
            name: "name",
            value: "Simon",
          }),
          age: numberField({
            name: "age",
            value: 20,
          }),
        },
      ],
    },
  ],
};

export const AddressesWithPeopleListField = formStory({
  args: {
    fields,
    children: ({ form }) => (
      <ListField
        keyFrom="street"
        path={["addresses"]}
        form={form}
        builder={addressBuilder}
        AddItemButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Address
          </Button>
        )}
      >
        {({ fields, index }) => (
          <Fragment key={index}>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <TextField label="City" field={fields.city} />
              <TextField label="Street" field={fields.street} />
            </div>
            <ListField
              keyFrom="name"
              path={["addresses", index, "people"]}
              builder={personBuilder}
              form={form}
              AddItemButton={({ add }) => (
                <Button color="gray" onClick={add}>
                  Add Person
                </Button>
              )}
            >
              {({ fields, index }) => (
                <div
                  key={index}
                  className="grid grid-flow-col grid-cols-2 gap-4"
                >
                  <TextField label="Name" field={fields.name} />
                  <NumberField label="Age" field={fields.age} />
                </div>
              )}
            </ListField>
          </Fragment>
        )}
      </ListField>
    ),
  },
});
