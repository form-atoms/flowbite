import { atom, useSetAtom } from "jotai";
import {
  checkboxField,
  listField,
  type TextField as TTextField,
  textField,
  CheckboxField,
} from "@form-atoms/field";
import { createList } from "@form-atoms/list-atom";
import { Button, Card } from "flowbite-react";

import { formStory, meta } from "../../stories/story-form";
import { RadioOption } from "../radio-option";
import { TextField } from "../text-field";
import { useFieldActions } from "form-atoms";

export default {
  title: "ListField",
  ...meta,
};

/**
 * A reference to the primary 2FA item from the list.
 */
const primary2FA = atom<TTextField | null>(null);

const phones = listField({
  name: "phones",
  value: [
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ],
  fields: () => {
    const number = textField({ name: "number" });

    return {
      number,
      primary: checkboxField({
        name: "primaryPhone",
        preprocess: (value, get) => {
          const primaryPhone = get(primary2FA);

          if (!primaryPhone) {
            // The form is being initialized, so use the initialValue
            return value;
          }

          /**
           * when the primary item is selected, the isPrimary will be computed
           * by comparing the current phone with the primary2FA reference.
           */
          return primaryPhone === number;
        },
      }).optional(),
    };
  },
});

const { List } = createList(phones);

/**
 * See more:
 * @link https://form-atoms.github.io/list-atom/?path=/docs/components-list--docs#with-computed-field
 */
export const PhonesListField = formStory({
  args: {
    fields: { phones },
    children: ({ required }) => (
      <List>
        <List.Item>
          {({ fields }) => (
            <Card>
              <TextField
                field={fields.number}
                required={required}
                label="Phone Number"
              />
              <PrimaryRadio isPrimary={fields.primary} phone={fields.number} />
            </Card>
          )}
        </List.Item>
        <List.Add>
          {({ add }) => (
            <Button color="light" onClick={() => add()}>
              Add Phone
            </Button>
          )}
        </List.Add>
      </List>
    ),
  },
});

function PrimaryRadio({
  phone,
  isPrimary,
}: {
  phone: TTextField;
  isPrimary: CheckboxField;
}) {
  const setPrimary = useSetAtom(primary2FA);
  /**
   * We need to validate the list when the primary item is changed.
   * Otherwise the list might stay in an invalid state.
   */
  const { validate } = useFieldActions(phones);

  return (
    <RadioOption
      field={isPrimary}
      label="Primary Phone"
      helperText="SMS to this phone will be used for authentication purposes"
      onChange={() => {
        setPrimary(phone);
        validate();
      }}
    />
  );
}
