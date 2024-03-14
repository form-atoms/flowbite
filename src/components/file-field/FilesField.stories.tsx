import { filesField } from "@form-atoms/field";

import { FilesField } from "./FilesField";
import { FormStory, meta, optionalField } from "../../stories/story-form";

export default {
  title: "FilesField",
  ...meta,
};

const profilePicture = filesField();

export const Required: FormStory = {
  args: {
    fields: { profilePicture },
    children: ({ required }) => (
      <FilesField
        field={profilePicture}
        label="Profile Picture"
        required={required}
      />
    ),
  },
};

const profilePictureOpitonal = filesField().optional();

export const Optional: FormStory = {
  ...optionalField,
  args: {
    fields: { profilePicture: profilePictureOpitonal },
    children: () => (
      <FilesField field={profilePictureOpitonal} label="Profile Picture" />
    ),
  },
};
