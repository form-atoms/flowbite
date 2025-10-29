import { stringField } from "@form-atoms/field";
import { act, render, renderHook, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { formAtom, useFormSubmit } from "form-atoms";
import { describe, expect, it } from "vitest";

import { country, getLabel, getValue, options } from "./country";

import { SelectField } from "./";

describe("<SelectField />", () => {
  const props = {
    options,
    getLabel,
    getValue,
    label: "country",
  };

  it("should focus input when clicked on label", async () => {
    render(<SelectField field={country} {...props} />);

    await userEvent.click(screen.getByLabelText("country", { exact: false }));

    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("should render error message when submitting empty & required", async () => {
    const field = stringField({ required_error: "Required" });
    const form = formAtom({ field });
    const { result } = renderHook(() => useFormSubmit(form));

    render(<SelectField field={field} {...props} />);

    const onSubmit = vi.fn();
    await act(async () => {
      result.current(onSubmit)();
    });

    const select = screen.getByRole("combobox");

    expect(select).toHaveAttribute("aria-required", "true");
    // TODO: should be separate test and have different behavior
    // expect(select).toHaveAttribute("required", "true");

    expect(select).toBeInvalid();
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();
  });

  it("should use the placeholder prop", () => {
    const field = stringField();

    render(
      <SelectField field={field} {...props} placeholder="Pick a country" />,
    );

    expect(screen.getByText("Pick a country")).toBeInTheDocument();
  });

  describe("with optional selectField()", () => {
    it("submits with undefined", async () => {
      const option = stringField().optional();
      const form = formAtom({ option });
      const { result } = renderHook(() => useFormSubmit(form));

      render(<SelectField field={option} {...props} />);

      // const select = screen.getByRole("combobox");
      // HappyDOM BUG:
      // TypeError: element.checkValidity is not a function
      // expect(select).toBeValid();

      const onSubmit = vi.fn();
      await act(async () => {
        result.current(onSubmit)();
      });

      expect(onSubmit).toHaveBeenCalledWith({ option: undefined });
    });
  });
});
