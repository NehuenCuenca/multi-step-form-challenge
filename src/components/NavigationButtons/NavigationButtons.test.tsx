import { queryByRole, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import NavigationButtons from "./NavigationButtons";

describe("Navigation buttons component tests", () => {
  const mockNewNavigation = vi.fn( (step: number) => console.log(step) );
  const mockConfirmFinishForm = vi.fn( () => true );

  test("Show only NEXT step button", () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={2}
        currentStep={0}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect(
      queryByRole(container, "button", { name: "Next Step" })
    ).toBeTruthy();
    expect(queryByRole(container, "button", { name: "Go Back" })).toBeFalsy();
    expect(queryByRole(container, "button", { name: "Confirm" })).toBeFalsy();
  });

  test("Show BACK and NEXT step buttons", () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={3}
        currentStep={1}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect(
      queryByRole(container, "button", { name: "Next Step" })
    ).toBeTruthy();
    expect(queryByRole(container, "button", { name: "Go Back" })).toBeTruthy();
    expect(queryByRole(container, "button", { name: "Confirm" })).toBeFalsy();
  });

  test("Show BACK and CONFIRM step buttons", () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={2}
        currentStep={1}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect(queryByRole(container, "button", { name: "Go Back" })).toBeTruthy();
    expect(queryByRole(container, "button", { name: "Confirm" })).toBeTruthy();
    expect(queryByRole(container, "button", { name: "Next Step" })).toBeFalsy();
  });

  test("Ensure that BACK and NEXT step function of button is called when clicked", async() => {
    render(
      <NavigationButtons
        quantitySteps={3}
        currentStep={1}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    const backStepButton = screen.getByRole("button", { name: "Go Back" });
    await userEvent.click(backStepButton)
    expect(mockNewNavigation).toHaveBeenCalledWith(-1)

    const nextStepButton = screen.getByRole("button", { name: "Next Step" });
    await userEvent.click(nextStepButton)
    expect(mockNewNavigation).toHaveBeenCalledWith(1)
  });

  test("Ensure that CONFIRM multi step form function of button is called when clicked", async() => {
    render(
      <NavigationButtons
        quantitySteps={3}
        currentStep={2}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    const confirmMultiStepFormButton = screen.getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmMultiStepFormButton)
    expect(mockConfirmFinishForm).toHaveReturnedWith(true)
  });
});
