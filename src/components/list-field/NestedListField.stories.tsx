import {
  ListField,
  listFieldBuilder,
  numberField,
  textField,
} from "@form-atoms/field";
import { Button, Card } from "flowbite-react";

import { NumberField } from "../number-field";
import { formStory, meta } from "../story-form";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

const personBuilder = listFieldBuilder(({ name, age }) => ({
  name: textField({
    name: "name",
    value: name,
  }),
  age: numberField({
    name: "age",
    value: age,
  }),
}));

const addressBuilder = listFieldBuilder(({ city, street, people = [] }) => ({
  city: textField({
    name: "city",
    value: city,
  }),
  street: textField({
    name: "street",
    value: street,
  }),
  people: personBuilder(people),
}));

const fields = {
  addresses: addressBuilder([
    {
      city: "Bratislava",
      street: "Kosicka",
      people: [
        {
          name: "Simon",
          age: 20,
        },
      ],
    },
  ]),
};

export const AddressesWithPeopleListField = formStory({
  args: {
    fields,
    children: ({ form }) => (
      <ListField
        form={form}
        keyFrom="street"
        path={["addresses"]}
        builder={addressBuilder}
        AddItemButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Address
          </Button>
        )}
      >
        {({ fields, index }) => (
          <Card>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <TextField label="City" field={fields.city} />
              <TextField label="Street" field={fields.street} />
            </div>
            <ListField
              form={form}
              keyFrom="name"
              path={["addresses", index, "people"]}
              builder={personBuilder}
              AddItemButton={({ add }) => (
                <Button color="gray" onClick={add}>
                  Add Person
                </Button>
              )}
            >
              {({ fields }) => (
                <Card className="grid grid-flow-col grid-cols-2 gap-4">
                  <TextField label="Name" field={fields.name} />
                  <NumberField label="Age" field={fields.age} />
                </Card>
              )}
            </ListField>
          </Card>
        )}
      </ListField>
    ),
  },
});
