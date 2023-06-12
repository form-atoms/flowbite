import { listFieldAtoms, textField } from "@form-atoms/field";

import { ListField } from "./ListField";
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

const addressBuilder = (
  { city, street }: Address | undefined = {
    city: "",
    street: "",
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
});

const fields = {
  addresses: listFieldAtoms(addressBuilder, [
    { city: "Stockholm", street: "Carl Gustav Street" },
    { city: "Bratislava", street: "Kosicka" },
  ]),
};

export const AddressesListField = formStory({
  args: {
    fields,
    children: ({ form }) => (
      <ListField
        keyFrom="city"
        path={["addresses"]}
        form={form}
        builder={addressBuilder}
      >
        {({ fields, index }) => (
          <div key={index} className="grid grid-flow-col grid-cols-2 gap-4">
            <TextField label="City" field={fields.city} />
            <TextField label="Street" field={fields.street} />
          </div>
        )}
      </ListField>
    ),
  },
});
