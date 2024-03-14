import { dateField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { DatepickerField } from "./DatepickerField";

describe("<DatepickerField />", () => {
  it("focuses input when clicked on label", async () => {
    const field = dateField();

    render(<DatepickerField role="dialog" field={field} label="label" />);

    await act(() =>
      userEvent.click(screen.getByLabelText("label", { exact: false })),
    );

    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  describe("with required field", () => {
    it("renders error message when submitting empty", async () => {
      const field = dateField();

      const form = formAtom({
        field,
      });
      const { result } = renderHook(() => useFormSubmit(form));

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      render(<DatepickerField role="dialog" field={field} label="label" />);

      expect(screen.getByRole("dialog")).toBeInvalid();
      expect(screen.getByText("This field is required")).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
    });

    it("submits without error when valid", async () => {
      const value = new Date();

      const field = dateField();
      const form = formAtom({
        field,
      });
      const { result } = renderHook(() => useFormSubmit(form));

      render(
        <DatepickerField
          initialValue={value}
          role="dialog"
          field={field}
          label="label"
        />,
      );

      const input = screen.getByRole("dialog");

      expect(input).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: value });
    });
  });

  describe("with optional field", () => {
    it("submits with undefined", async () => {
      const field = dateField().optional();
      const form = formAtom({
        field,
      });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<DatepickerField role="dialog" field={field} label="label" />);

      const textarea = screen.getByRole("dialog");

      expect(textarea).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: undefined });
    });
  });
});
