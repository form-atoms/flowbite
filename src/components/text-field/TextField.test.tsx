import { textField } from "@form-atoms/field";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useForm, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { TextField } from ".";

describe("<TextField />", () => {
  it("should focus input when clicked on label", async () => {
    const lastName = textField();

    render(<TextField field={lastName} label="last name" />);

    await userEvent.click(screen.getByLabelText("last name", { exact: false }));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  describe("with optional textField()", () => {
    it("submits with empty string", async () => {
      const message = textField().optional();
      const form = formAtom({ message });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<TextField field={message} />);

      const textbox = screen.getByRole("textbox");

      expect(textbox).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ message: "" });
    });
  });

  it("has pristine input after form reset", async () => {
    const message = textField().optional();
    const form = formAtom({ message });
    const { result } = renderHook(() => useForm(form));

    render(<TextField field={message} />);

    const textbox = screen.getByRole("textbox");

    await fireEvent.change(textbox, { target: { value: "memento mori" } });

    expect(textbox).toHaveValue("memento mori");

    await act(async () => {
      result.current.reset();
    });

    expect(textbox).toHaveValue("");

    const onSubmit = vi.fn();
    await act(async () => {
      result.current.submit(onSubmit)();
    });

    expect(onSubmit).toHaveBeenCalledWith({ message: "" });
  });
});
