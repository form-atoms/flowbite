import { listField, numberField, textField } from "@form-atoms/field";
import { ListOf, createList } from "@form-atoms/list-atom";
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
  fields: () => ({
    city: textField({
      name: "city",
    }),
    street: textField({
      name: "street",
    }),
    people: listField({
      name: "people",
      fields: () => ({
        name: textField({
          name: "name",
        }),
        age: numberField({
          name: "age",
        }),
      }),
    }),
  }),
});

const { List } = createList(addresses);

export const AddressesWithPeopleListField = formStory({
  args: {
    fields: { addresses },
    children: () => (
      <List>
        <List.Item>
          {({ fields }) => (
            <Card>
              <div className="grid grid-flow-col grid-cols-2 gap-4">
                <TextField label="City" field={fields.city} />
                <TextField label="Street" field={fields.street} />
              </div>
              <ListOf atom={fields.people}>
                {(List) => (
                  <>
                    <List.Item>
                      {({ fields }) => (
                        <Card className="grid grid-flow-col grid-cols-2 gap-4">
                          <TextField label="Name" field={fields.name} />
                          <NumberField label="Age" field={fields.age} />
                        </Card>
                      )}
                    </List.Item>
                    <List.Add>
                      {({ add }) => (
                        <Button color="gray" onClick={() => add()}>
                          Add Person
                        </Button>
                      )}
                    </List.Add>
                  </>
                )}
              </ListOf>
            </Card>
          )}
        </List.Item>
        <List.Add>
          {({ add }) => (
            <Button color="gray" onClick={() => add()}>
              Add Address
            </Button>
          )}
        </List.Add>
      </List>
    ),
  },
});
