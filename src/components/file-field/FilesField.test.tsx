import { filesField } from "@form-atoms/field";
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

import { FilesField } from ".";

describe("<FilesField />", () => {
  it("should focus input when clicked on label", async () => {
    const profilePic = filesField();

    render(<FilesField field={profilePic} label="photo" />);

    await userEvent.click(screen.getByLabelText("photo", { exact: false }));

    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it.skip("should render error message when submitting empty & required file field", async () => {
    const doc = filesField();
    const form = formAtom({ doc });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<FilesField field={doc} label="document scan" />);

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    // TODO: event does not cause re-render
    expect(screen.getByRole("dialog")).toBeInvalid();
    expect(
      screen.getByText("Input not instance of FileList"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  describe("with optional filesField()", () => {
    it("submits form with empty array value", async () => {
      const value = filesField().optional();
      const form = formAtom({ value });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<FilesField field={value} />);

      const input = screen.getByRole("dialog");

      expect(input).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ value: [] });
    });

    it("has pristine input after form reset", async () => {
      const logo = filesField().optional();
      const form = formAtom({ logo });
      const { result } = renderHook(() => useForm(form));

      render(<FilesField field={logo} />);

      const fileInput = screen.getByRole("dialog") as HTMLInputElement;

      const files = [new File(["logo"], "logo.jpeg", { type: "image/jpeg" })];

      await fireEvent.change(fileInput, {
        target: { files },
      });

      expect(fileInput.files).toBe(files);
      expect(fileInput).toHaveValue("/fake/path/logo.jpeg");

      // WORKARROUND: should not be here, happy-dom should clear files state when input value set to ""
      await fireEvent.change(fileInput, {
        target: { files: [], value: "" },
      });
      // must be after workarround, so zod validator gets undefined input instead of empty array
      await act(async () => {
        result.current.reset();
      });

      expect(fileInput).toBeValid();
      expect(fileInput).toHaveValue("");

      const onSubmit = vi.fn();
      await act(async () => {
        result.current.submit(onSubmit)();
      });

      expect(fileInput).toBeValid();
      expect(onSubmit).toHaveBeenCalledWith({ logo: [] });
    });
  });
});
