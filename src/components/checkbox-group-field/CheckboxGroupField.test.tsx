import { stringArrayField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { getLabel, getValue, options } from "./languages";

import { CheckboxGroupField } from ".";

describe("<CheckboxGroupField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "lang",
  };

  it("should focus first checkbox when clicked on first label", async () => {
    const field = stringArrayField();

    render(<CheckboxGroupField field={field} {...props} />);

    const [firstCheckbox] = screen.getAllByRole("checkbox");

    await userEvent.click(screen.getByLabelText(options[0].name));

    expect(firstCheckbox).toHaveFocus();
  });

  it("should render error message when submitting empty & required", async () => {
    const field = stringArrayField();
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<CheckboxGroupField field={field} {...props} />);

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    const [firstCheckbox] = screen.getAllByRole("checkbox");

    expect(firstCheckbox).toBeInvalid();
    expect(
      screen.getByText("Array must contain at least 1 element(s)"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  describe("with optional stringArrayField()", () => {
    it("submits form with empty array value", async () => {
      const value = stringArrayField().optional();
      const form = formAtom({ value });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<CheckboxGroupField field={value} {...props} />);

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ value: [] });
    });
  });
});
