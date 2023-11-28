import {
  ListFieldProps,
  ListField as BaseListField,
  AddItemButtonProps,
  RemoveItemButtonProps,
} from "@form-atoms/field";
import { Button, Label } from "flowbite-react";
import { FormFields } from "form-atoms";
import { ReactNode } from "react";

const FlowbiteAddItemButton = ({ add }: AddItemButtonProps) => (
  <Button onClick={add}>Add Item</Button>
);

const FlowbiteRemoveItemButton = ({ remove }: RemoveItemButtonProps) => (
  <Button color="failure" outline onClick={remove}>
    Remove
  </Button>
);
/**
 * Not a proper field, as it does not display errors, like when minimum 1 item in array would be required.
 */
export const ListField = <
  Fields extends FormFields,
  Path extends (string | number)[]
>({
  label,
  AddItemButton = FlowbiteAddItemButton,
  RemoveItemButton = FlowbiteRemoveItemButton,
  children,
  ...props
}: ListFieldProps<Fields, Path> & Partial<{ label: ReactNode }>) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      {/**
       *  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
       *  @ts-ignore */}
      <BaseListField {...props} {...{ AddItemButton, RemoveItemButton }}>
        {(props) => <>{children(props)}</>}
      </BaseListField>
    </>
  );
};
