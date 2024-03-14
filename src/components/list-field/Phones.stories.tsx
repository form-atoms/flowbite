import {
  List,
  Radio,
  RadioControl,
  checkboxField,
  listField,
  textField,
} from "@form-atoms/field";
import { Card } from "flowbite-react";

import { formStory, meta } from "../../stories/story-form";
import { RadioOption } from "../radio-option";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

const phones = listField({
  value: [
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ],
  builder: ({ number, primary }) => ({
    number: textField({ name: "number", value: number }),
    primary: checkboxField({
      name: "primaryPhone",
      value: primary,
    }).optional(),
  }),
});

export const PhonesListField = formStory({
  args: {
    fields: { phones },
    children: ({ required, fields }) => (
      <RadioControl name="primaryPhone">
        {({ control }) => (
          <List field={fields.phones}>
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
          </List>
        )}
      </RadioControl>
    ),
  },
});
