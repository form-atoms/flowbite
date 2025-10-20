import {
  Radio,
  RadioControl,
  checkboxField,
  listField,
  textField,
} from "@form-atoms/field";
import { createList } from "@form-atoms/list-atom";
import { Button, Card } from "flowbite-react";

import { formStory, meta } from "../../stories/story-form";
import { RadioOption } from "../radio-option";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

const phones = listField({
  name: "phones",
  value: [
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ],
  fields: () => ({
    number: textField({ name: "number" }),
    primary: checkboxField({
      name: "primaryPhone",
    }).optional(),
  }),
});

const { List } = createList(phones);

export const PhonesListField = formStory({
  args: {
    fields: { phones },
    children: ({ required }) => (
      <RadioControl name="primaryPhone">
        {({ control }) => (
          <List>
            <List.Item>
              {({ fields }) => (
                <Card>
                  <TextField
                    field={fields.number}
                    required={required}
                    label="Phone Number"
                  />
                  <Radio control={control} field={fields.primary}>
                    {() => (
                      <RadioOption
                        field={fields.primary}
                        required={required}
                        label="Primary Phone"
                        helperText="SMS to this phone will be used for authentication purposes"
                      />
                    )}
                  </Radio>
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
        )}
      </RadioControl>
    ),
  },
});
