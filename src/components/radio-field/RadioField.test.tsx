import { stringField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { getLabel, getValue, options } from "../select-field/country";

import { RadioField } from ".";

describe("<RadioField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "country",
  };

  it("should render error message when submitting empty & required", async () => {
    const field = stringField();
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<RadioField field={field} {...props} />);

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    const [firstRadio] = screen.getAllByRole("radio");

    expect(firstRadio).toBeInvalid();
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  describe("with optional stringField()", () => {
    it("submits form with undefined empty value", async () => {
      const option = stringField().optional();
      const form = formAtom({ option });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<RadioField field={option} {...props} />);

      const [firstRadio] = screen.getAllByRole("radio");

      expect(firstRadio).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ option: undefined });
    });
  });
});
