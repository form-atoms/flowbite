import { dateField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFieldActions, useFormSubmit } from "form-atoms";
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

      render(<DatepickerField role="dialog" field={field} />);

      expect(screen.getByRole("dialog")).toBeInvalid();
      expect(screen.getByText("Required")).toBeInTheDocument();
      expect(onSubmit).not.toBeCalled();
    });

    it("submits without error when valid", async () => {
      const value = new Date();
      const field = dateField();
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      render(
        <DatepickerField field={field} initialValue={value} role="dialog" />,
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
      const form = formAtom({ field });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<DatepickerField field={field} role="dialog" />);

      const dateInput = screen.getByRole("dialog");

      expect(dateInput).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ field: undefined });
    });
  });

  describe("placeholder", () => {
    it("renders", () => {
      const field = dateField();

      render(<DatepickerField field={field} placeholder="Pick a date" />);

      expect(screen.getByPlaceholderText("Pick a date")).toBeInTheDocument();
    });

    it("appears when the field is cleared", async () => {
      const field = dateField({ value: new Date() });
      const { result: fieldActions } = renderHook(() => useFieldActions(field));

      render(<DatepickerField field={field} placeholder="Pick a date" />);

      expect(
        screen.queryByPlaceholderText("Pick a date"),
      ).not.toBeInTheDocument();

      await act(async () => {
        fieldActions.current.setValue(undefined);
      });

      expect(screen.queryByPlaceholderText("Pick a date")).toBeInTheDocument();
    });
  });

  describe("reset", () => {
    it("clears the current value back to the initial value", async () => {
      const field = dateField();
      const { result: fieldActions } = renderHook(() => useFieldActions(field));

      const initialValue = new Date(2024, 2, 31);

      render(<DatepickerField field={field} initialValue={initialValue} />);

      expect(screen.queryByDisplayValue("March 31, 2024")).toBeInTheDocument();

      await act(() => userEvent.click(screen.getByRole("textbox")));
      await act(() => userEvent.click(screen.getAllByText("1")[0]!));

      expect(screen.queryByDisplayValue("March 1, 2024")).toBeInTheDocument();

      await act(async () => {
        fieldActions.current.reset();
      });

      expect(screen.queryByDisplayValue("March 31, 2024")).toBeInTheDocument();
    });
  });
});
