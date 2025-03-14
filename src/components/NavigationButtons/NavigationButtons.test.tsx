import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import NavigationButtons from "./NavigationButtons";
import { queryByRole } from "@testing-library/react"

describe("Navigation buttons component tests", () => {
  const mockNewNavigation = (step: number) => console.log(step);
  const mockConfirmFinishForm = () => console.log("mockConfirmFinishForm");
  
  test("Show only NEXT step button", async () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={2}
        currentStep={0}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect( queryByRole(container, 'button', {name: 'Next Step'}) ).toBeTruthy();
    expect( queryByRole(container, 'button', {name: 'Go Back'}) ).toBeFalsy();
    expect( queryByRole(container, 'button', {name: 'Confirm'}) ).toBeFalsy();
  });

  test("Show BACK and NEXT step buttons", async () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={3}
        currentStep={1}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect( queryByRole(container, 'button', {name: 'Next Step'}) ).toBeTruthy();
    expect( queryByRole(container, 'button', {name: 'Go Back'}) ).toBeTruthy();
    expect( queryByRole(container, 'button', {name: 'Confirm'}) ).toBeFalsy();
  });

  test("Show BACK and CONFIRM step buttons", async () => {
    const { container } = render(
      <NavigationButtons
        quantitySteps={2}
        currentStep={1}
        newNavigation={mockNewNavigation}
        confirmFinishForm={mockConfirmFinishForm}
      />
    );

    expect( queryByRole(container, 'button', {name: 'Go Back'}) ).toBeTruthy();
    expect( queryByRole(container, 'button', {name: 'Confirm'}) ).toBeTruthy();
    expect( queryByRole(container, 'button', {name: 'Next Step'}) ).toBeFalsy();
  });
});
