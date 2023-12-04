import { ListField, listFieldBuilder, textField } from "@form-atoms/field";
import { Card } from "flowbite-react";

import { formStory, meta } from "../story-form";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

const addressBuilder = listFieldBuilder(({ city, street }) => ({
  city: textField({
    name: "city",
    value: city,
  }),
  street: textField({
    name: "street",
    value: street,
  }),
}));

const fields = {
  addresses: addressBuilder([
    { city: "Stockholm", street: "Carl Gustav Street" },
    { city: "Bratislava", street: "Kosicka" },
  ]),
};

export const AddressesListField = formStory({
  args: {
    fields,
    children: ({ form }) => (
      <ListField
        form={form}
        keyFrom="city"
        path={["addresses"]}
        builder={addressBuilder}
      >
        {({ fields }) => (
          <Card className="grid grid-flow-col grid-cols-2 gap-4">
            <TextField label="City" field={fields.city} />
            <TextField label="Street" field={fields.street} />
          </Card>
        )}
      </ListField>
    ),
  },
});
