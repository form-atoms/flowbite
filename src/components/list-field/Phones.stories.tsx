import {
  Radio,
  RadioControl,
  checkboxField,
  listFieldBuilder,
  textField,
} from "@form-atoms/field";
import { Card } from "flowbite-react";

import { ListField } from "./ListField";
import { RadioOption } from "../radio-option";
import { formStory, meta } from "../story-form";
import { TextField } from "../text-field";

export default {
  title: "ListField",
  ...meta,
};

const phoneBuilder = listFieldBuilder(({ number, primary }) => ({
  number: textField({ name: "number", value: number }),
  primary: checkboxField({
    name: "primaryPhone",
    value: primary,
  }).optional(),
}));

const formFields = {
  phones: phoneBuilder([
    { number: "+421 933 888 999", primary: true },
    { number: "+420 905 100 200", primary: false },
  ]),
};

export const PhonesListField = formStory({
  args: {
    fields: formFields,
    children: ({ required, form }) => (
      <RadioControl name="primaryPhone">
        {({ control }) => (
          <ListField
            keyFrom="primary"
            form={form}
            path={["phones"]}
            builder={phoneBuilder}
          >
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
          </ListField>
        )}
      </RadioControl>
    ),
  },
});
