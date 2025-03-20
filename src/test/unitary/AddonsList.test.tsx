/* 
    TODO: TESTS TO REALIZE
    test('Validate checked class of an addon-item', () => { second })
*/

import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import AddonsList from "@components/AddonsList/AddonsList";
import { Period } from "@ownTypes/secondStep.types";
import { Addon } from "@ownTypes/thirdStep.types";
import { addons } from "@data/mockAddons";
import { getAllByText, queryAllByRole, queryAllByText, queryByLabelText, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { userEvent } from "@vitest/browser/context";

describe("Navigation buttons component tests", () => {
    const mockToggleCheckAddon = vi.fn((clickedAddon: Addon, wantToRemove: boolean) => ({clickedAddon, wantToRemove}))
    beforeEach(() => { mockToggleCheckAddon.mockReset(); })
    
    test('Show all the addons', () => { 
        const { container } = render(<AddonsList selectedPeriod={Period.monthly} toggleCheckAddon={mockToggleCheckAddon}/>)
        addons.forEach( (addon: Addon) => {
            expect( queryByLabelText(container, addon.title) )
        })

        expect( queryAllByRole(container, 'listitem').length ).toBe( addons.length )
    })
    
    test(`Shows the monthly prices if the selected period is ${Period.monthly}`, () => { 
        const { container } = render(<AddonsList selectedPeriod={Period.monthly} toggleCheckAddon={mockToggleCheckAddon}/>)
        expect( getAllByText(container, /\/mo/).length ).toBe( addons.length )
        expect( queryAllByText(container, /\/yr/).length ).toBe( 0 )
    })

    test(`Shows the yearly prices if the selected period is ${Period.yearly}`, () => { 
        const { container } = render(<AddonsList selectedPeriod={Period.yearly} toggleCheckAddon={mockToggleCheckAddon}/>)
        expect( getAllByText(container, /\/yr/).length ).toBe( addons.length )
        expect( queryAllByText(container, /\/mo/).length ).toBe( 0 )
    })

    test('Ensure addon-checkbox function of button is called when un/checked', async() => { 
        render(<AddonsList selectedPeriod={Period.yearly} toggleCheckAddon={mockToggleCheckAddon}/>)

        const [firstAddonCheckbox] = screen.getAllByRole("checkbox");
        await userEvent.click(firstAddonCheckbox)
        expect(mockToggleCheckAddon).toHaveBeenCalled()
    })
  
    test('Validate checked class of an addon-item', async() => { 
        render(<AddonsList selectedPeriod={Period.yearly} toggleCheckAddon={mockToggleCheckAddon}/>)

        const [firstAddonCheckbox] = screen.getAllByRole("checkbox");
        
        await userEvent.click(firstAddonCheckbox) // check
        expect( firstAddonCheckbox.parentElement?.classList.contains('addon-item_checked') ).toBeTruthy();
        
        await userEvent.click(firstAddonCheckbox) //uncheck
        expect( firstAddonCheckbox.parentElement?.classList.contains('addon-item_checked') ).toBeFalsy();
    })
    
})