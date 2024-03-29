import { listField, textField } from "@form-atoms/field";
import { List } from "@form-atoms/list-atom";
import { Button, Card, Label } from "flowbite-react";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineTrash,
} from "react-icons/hi2";
import { z } from "zod";

import { TextField } from "../../components";

const zipCodeSchema = z.string().regex(/^\d{5}$/);

const addresses = listField({
  value: [{ city: "Bratislava", street: "Hrad", zipCode: "81106" }],
  fields: ({ city, street, zipCode }) => ({
    city: textField({
      name: "city",
      value: city,
    }),
    street: textField({
      name: "street",
      value: street,
    }),
    zipCode: textField({
      schema: zipCodeSchema,
      name: "zipCode",
      value: zipCode,
    }),
  }),
});

export const AddressesListField = () => (
  <div className="max-w-xl">
    <div className="flex flex-col gap-4">
      <List
        atom={addresses}
        RemoveButton={({ remove }) => (
          <Button onClick={remove} color="failure">
            <HiOutlineTrash />
          </Button>
        )}
        AddButton={({ add }) => (
          <Button onClick={() => add()}>Add address</Button>
        )}
      >
        {({ fields, RemoveButton, index, moveUp, moveDown }) => (
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
                <RemoveButton />
              </div>
            </div>
            <TextField label="City" field={fields.city} />
            <TextField label="Street" field={fields.street} />
            <TextField label="Zip Code" field={fields.zipCode} />
          </Card>
        )}
      </List>
    </div>
  </div>
);
