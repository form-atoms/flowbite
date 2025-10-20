import { listField, textField } from "@form-atoms/field";
import { createList } from "@form-atoms/list-atom";
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
  fields: () => ({
    city: textField({
      name: "city",
    }),
    street: textField({
      name: "street",
    }),
    zipCode: textField({
      schema: zipCodeSchema,
      name: "zipCode",
    }),
  }),
});

const { List } = createList(addresses);

export const AddressesListField = () => (
  <div className="max-w-xl">
    <div className="flex flex-col gap-4">
      <List>
        <List.Item>
          {({ fields, index, remove, moveUp, moveDown }) => (
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
                  <Button color="red" onClick={remove}>
                    <HiOutlineTrash />
                  </Button>
                </div>
              </div>
              <TextField label="City" field={fields.city} />
              <TextField label="Street" field={fields.street} />
              <TextField label="Zip Code" field={fields.zipCode} />
            </Card>
          )}
        </List.Item>
        <List.Add>
          {({ add }) => <Button onClick={() => add()}>Add address</Button>}
        </List.Add>
      </List>
    </div>
  </div>
);
