import { listField, numberField, textField } from "@form-atoms/field";
import { List } from "@form-atoms/list-atom";
import { Button, Card } from "flowbite-react";

import { formStory, meta } from "../../stories/story-form";
import { NumberField } from "../number-field";
import { TextField } from "../text-field";

export default {
  title: "List",
  ...meta,
};

const addresses = listField({
  name: "address",
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
  fields: ({ city, street, people = [] }) => ({
    city: textField({
      name: "city",
      value: city,
    }),
    street: textField({
      name: "street",
      value: street,
    }),
    people: listField({
      name: "people",
      value: people,
      fields: ({ name, age }) => ({
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
        atom={fields.addresses}
        AddButton={({ add }) => (
          <Button color="gray" onClick={() => add()}>
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
              atom={fields.people}
              AddButton={({ add }) => (
                <Button color="gray" onClick={() => add()}>
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
