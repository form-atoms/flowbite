import { listFieldBuilder, textField } from "@form-atoms/field";
import { Button, Card, Label } from "flowbite-react";
import { formAtom } from "form-atoms";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineTrash,
} from "react-icons/hi2";
import { z } from "zod";

import { ListField, TextField } from "../../components";

const zipCodeSchema = z.string().regex(/^\d{5}$/);

const addressBuilder = listFieldBuilder(({ city, street, zip }) => ({
  city: textField({
    name: "city",
    value: city,
  }),
  street: textField({
    name: "street",
    value: street,
  }),
  zip: textField({ schema: zipCodeSchema, name: "zip", value: zip }),
}));

const fields = {
  addresses: addressBuilder([
    { city: "Bratislava", street: "Hrad", zip: "81106" },
  ]),
};

const form = formAtom(fields);

export const AddressesListField = () => (
  <div className="max-w-xl">
    <div className="flex flex-col gap-4">
      <ListField
        keyFrom="city"
        label="Adjust your addresses, the first one will be primary."
        path={["addresses"]}
        form={form}
        builder={addressBuilder}
        RemoveItemButton={({ remove }) => (
          <Button onClick={remove} color="failure">
            <HiOutlineTrash />
          </Button>
        )}
        AddItemButton={({ add }) => <Button onClick={add}>Add address</Button>}
      >
        {({ fields, RemoveItemButton, index, moveUp, moveDown }) => (
          <Card>
            <div className="flex items-center justify-between">
              <Label>Address #{index + 1}</Label>
              <div className="flex gap-2">
                <Button color="light" onClick={moveUp}>
                  <HiOutlineChevronUp />
                </Button>
                <Button color="light" onClick={moveDown}>
                  <HiOutlineChevronDown />
                </Button>
                <RemoveItemButton />
              </div>
            </div>
            <TextField label="City" field={fields.city} />
            <TextField label="Street" field={fields.street} />
            <TextField label="Zip Code" field={fields.zip} pattern="#####" />
          </Card>
        )}
      </ListField>
    </div>
  </div>
);
