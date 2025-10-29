import { checkboxField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { CheckboxField } from ".";

describe("<CheckboxField />", () => {
  it("should be checked when initial value is true", async () => {
    const tos = checkboxField({ value: true });

    render(<CheckboxField field={tos} label="terms" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeValid();
    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toBeChecked();
  });

  it("should focus input when clicked on label", async () => {
    const tos = checkboxField({});

    render(<CheckboxField field={tos} label="terms" />);

    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);

    // TODO: clicking does not fire change event somehow
    // expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveFocus();
  });

  describe("with required checkboxField()", () => {
    it("renders error message when submitting unchecked", async () => {
      const tos = checkboxField();
      const form = formAtom({ tos });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<CheckboxField field={tos} label="terms" />);

      const handleSubmit = vi.fn();
      await act(async () => {
        result.current(handleSubmit)();
      });

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInvalid();
      expect(checkbox).not.toBeChecked();
      expect(
        screen.getByText("Invalid input: expected true"),
      ).toBeInTheDocument();
      expect(handleSubmit).not.toBeCalled();
    });
  });

  describe("optional checkboxField()", () => {
    it("submits when unchecked", async () => {
      const newsletter = checkboxField().optional();
      const form = formAtom({ newsletter });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<CheckboxField field={newsletter} />);

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ newsletter: false });
    });
  });
});
