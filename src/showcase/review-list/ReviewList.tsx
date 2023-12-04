import {
  AddItemButtonProps,
  ListField,
  RemoveItemButtonProps,
  type TextField as TTextField,
  listFieldBuilder,
  textField,
} from "@form-atoms/field";
import { Button, Card, Label } from "flowbite-react";
import { FormAtom } from "form-atoms";
import {
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";

import { TextField } from "../../components";

const AddButton = ({ add }: AddItemButtonProps) => (
  // The div makes it non-full width
  <div>
    <Button onClick={add}>Add</Button>
  </div>
);

const RemoveButton = ({ remove }: RemoveItemButtonProps) => (
  <Button onClick={remove} color="light">
    <HiOutlineTrash />
  </Button>
);

export const reviewItemBuilder = listFieldBuilder((value) =>
  textField({
    value: value,
  }),
);

/**
 * Generic permits to include this review list in different forms having the positives/negatives fields at minimum.
 */
export const ReviewList = ({
  form,
}: {
  form: FormAtom<{ positives: TTextField[]; negatives: TTextField[] }>;
}) => (
  <Card>
    <Label>Please review your shoes:</Label>
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <Label>Positives</Label>
        <ListField
          form={form}
          path={["positives"]}
          builder={reviewItemBuilder}
          RemoveItemButton={RemoveButton}
          AddItemButton={AddButton}
        >
          {({ fields, RemoveItemButton }) => (
            <div className="flex items-center gap-2">
              <RemoveItemButton />
              <div className="w-full">
                <TextField icon={HiOutlinePlusCircle} field={fields} />
              </div>
            </div>
          )}
        </ListField>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Label>Negatives</Label>
        <ListField
          form={form}
          path={["negatives"]}
          builder={reviewItemBuilder}
          RemoveItemButton={RemoveButton}
          AddItemButton={AddButton}
        >
          {({ fields, RemoveItemButton }) => (
            <div className="flex w-full items-center gap-2">
              <RemoveItemButton />
              <div className="w-full">
                <TextField icon={HiOutlineMinusCircle} field={fields} />
              </div>
            </div>
          )}
        </ListField>
      </div>
    </div>
  </Card>
);
