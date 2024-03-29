import {
  type ListField,
  type TextField as TTextField,
} from "@form-atoms/field";
import {
  type AddButtonProps,
  List,
  type RemoveButtonProps,
} from "@form-atoms/list-atom";
import { Button, Card, Label } from "flowbite-react";
import {
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from "react-icons/hi2";

import { TextField } from "../../components";

const AddButton = ({ add }: AddButtonProps<any>) => (
  // The div makes it non-full width
  <div>
    <Button onClick={add}>Add</Button>
  </div>
);

const RemoveButton = ({ remove }: RemoveButtonProps) => (
  <Button onClick={remove} color="light">
    <HiOutlineTrash />
  </Button>
);

/**
 * Generic permits to include this review list in different forms having the positives/negatives fields at minimum.
 */
export const ReviewList = ({
  fields,
}: {
  fields: {
    positives: ListField<{ item: TTextField }, { item: string }>;
    negatives: ListField<{ item: TTextField }, { item: string }>;
  };
}) => (
  <Card>
    <Label>Please review your shoes:</Label>
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <Label>Positives</Label>
        <List
          atom={fields.positives}
          RemoveButton={RemoveButton}
          AddButton={AddButton}
        >
          {({ fields, RemoveButton }) => (
            <div className="flex items-center gap-2">
              <RemoveButton />
              <div className="w-full">
                <TextField icon={HiOutlinePlusCircle} field={fields.item} />
              </div>
            </div>
          )}
        </List>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Label>Negatives</Label>
        <List
          atom={fields.negatives}
          RemoveButton={RemoveButton}
          AddButton={AddButton}
        >
          {({ fields, RemoveButton }) => (
            <div className="flex w-full items-center gap-2">
              <RemoveButton />
              <div className="w-full">
                <TextField icon={HiOutlineMinusCircle} field={fields.item} />
              </div>
            </div>
          )}
        </List>
      </div>
    </div>
  </Card>
);
