import { List, listField, numberField, textField } from "@form-atoms/field";
import { Button, Card } from "flowbite-react";

import { NumberField } from "../number-field";
import { formStory, meta } from "../story-form";
import { TextField } from "../text-field";

export default {
  title: "List",
  ...meta,
};

const addresses = listField({
  value: [
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
  ],
  builder: ({ city, street, people = [] }) => ({
    city: textField({
      name: "city",
      value: city,
    }),
    street: textField({
      name: "street",
      value: street,
    }),
    people: listField({
      value: people,
      builder: ({ name, age }) => ({
        name: textField({
          name: "name",
          value: name,
        }),
        age: numberField({
          name: "age",
          value: age,
        }),
      }),
    }),
  }),
});

export const AddressesWithPeopleListField = formStory({
  args: {
    fields: { addresses },
    children: ({ fields }) => (
      <List
        field={fields.addresses}
        AddButton={({ add }) => (
          <Button color="gray" onClick={add}>
            Add Address
          </Button>
        )}
      >
        {({ fields }) => (
          <Card>
            <div className="grid grid-flow-col grid-cols-2 gap-4">
              <TextField label="City" field={fields.city} />
              <TextField label="Street" field={fields.street} />
            </div>
            <List
              field={fields.people}
              AddButton={({ add }) => (
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
            </List>
          </Card>
        )}
      </List>
    ),
  },
});
