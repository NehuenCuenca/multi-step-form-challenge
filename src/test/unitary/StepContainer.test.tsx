import { queryByRole, screen } from "@testing-library/react"
import { PointerEventsCheckLevel } from "@testing-library/user-event"
import { userEvent } from "@vitest/browser/context"
import { describe, expect, test, vi } from "vitest"
import { render } from "vitest-browser-react"
import StepContainer from "@components/StepContainer/StepContainer"

describe('Step container component unitary tests', () => {
  test('Should hide container headings', () => { 
    const { container } = render(<StepContainer hideContainerHeadings={true} containerTitle="Este TITULO no deberia verse" containerSubTitle="Este SUBTITULO no deberia verse" isVisible={true}>
                                    <p>Este step no deberia tener headings visibles</p>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem animi sed nam necessitatibus iste laudantium, rerum dolores voluptatibus perferendis aperiam labore repudiandae. Porro doloribus quod iure blanditiis voluptatibus ad fugiat!</p>
                                  </StepContainer>)

    expect( queryByRole(container, 'heading', {name: 'Este TITULO no deberia verse'}) ).toBeFalsy();
    expect( queryByRole(container, 'heading', {name: 'Este SUBTITULO no deberia verse'}) ).toBeFalsy();
  })

  test('Should show container headings', () => { 
    render(<StepContainer hideContainerHeadings={false} containerTitle="Este TITULO deberia verse" containerSubTitle="Este SUBTITULO deberia verse" isVisible={true}>
      <p>Este step deberia tener headings visibles</p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem animi sed nam necessitatibus iste laudantium, rerum dolores voluptatibus perferendis aperiam labore repudiandae. Porro doloribus quod iure blanditiis voluptatibus ad fugiat!</p>
    </StepContainer>)

    expect( screen.getByRole('heading', {name: 'Este TITULO deberia verse'}) ).toBeTruthy();
    expect( screen.getByRole('heading', {name: 'Este SUBTITULO deberia verse'}) ).toBeTruthy();
  })

  test('Should show content passed as children', () => { 
    render(<StepContainer hideContainerHeadings={false} containerTitle="Este TITULO deberia verse" containerSubTitle="Este SUBTITULO deberia verse" isVisible={true}>
      <p data-testid="paragraph-from-children">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ad perspiciatis molestiae, deserunt ipsam voluptatum. Ex voluptate accusantium vel minus, mollitia explicabo accusamus iusto, incidunt magni ipsam, iure perferendis repudiandae!</p>
      <form data-testid="form-from-children">
        <input type="text" name="test-input" id="" placeholder="This should be visible in the children" />
      </form>
    </StepContainer>)

    expect( screen.getByTestId('paragraph-from-children') ).toBeTruthy();
    expect( screen.getByTestId('form-from-children') ).toBeTruthy();
  })

  test('Should be hide if prop isVisible is false', async() => { 
    const { container } = render(<StepContainer data-testid="step" hideContainerHeadings={false} containerTitle="Este TITULO deberia verse" containerSubTitle="Este SUBTITULO deberia verse" isVisible={false}> 
      <p data-testid="paragraph-from-children">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ad perspiciatis molestiae, deserunt ipsam voluptatum. Ex voluptate accusantium vel minus, mollitia explicabo accusamus iusto, incidunt magni ipsam, iure perferendis repudiandae!</p>
    </StepContainer>)

    expect( container.firstElementChild!.classList.contains('step-container_hidden') ).toBeTruthy()
    expect( container.firstElementChild ).toHaveClass('step-container_hidden')
  })

  test('Content should be unattainable if prop isVisible is false', async({expect}) => { 
    const onClickSpy = vi.fn(() => console.log("clicked"))
    
    const { container } = render(<StepContainer onClick={onClickSpy} hideContainerHeadings={false} containerTitle="Este TITULO deberia verse" containerSubTitle="Este SUBTITULO deberia verse" isVisible={false}>
      <p data-testid="paragraph-from-children">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ad perspiciatis molestiae, deserunt ipsam voluptatum. Ex voluptate accusantium vel minus, mollitia explicabo accusamus iusto, incidunt magni ipsam, iure perferendis repudiandae!</p>
      <form data-testid="form-from-children">
        <input type="text" name="test-input" placeholder="This should be not visible in the children" />
        <button data-testid="button-from-children" onClick={() => console.log("clicked")}>Click me</button>
      </form>
    </StepContainer>)

    await userEvent.click(container, { pointerEventsCheck: PointerEventsCheckLevel.Never });
  
    expect(onClickSpy).not.toHaveBeenCalled();
  })

  test('Should be visible if prop isVisible is true', () => { 
    const { container } = render(<StepContainer data-testid="step-to-test" hideContainerHeadings={false} containerTitle="Este TITULO deberia verse" containerSubTitle="Este SUBTITULO deberia verse" isVisible={true}> 
      <p data-testid="paragraph-from-children">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ad perspiciatis molestiae, deserunt ipsam voluptatum. Ex voluptate accusantium vel minus, mollitia explicabo accusamus iusto, incidunt magni ipsam, iure perferendis repudiandae!</p>
    </StepContainer>)

    expect( container.firstElementChild!.classList.contains('step-container_hidden') ).toBeFalsy()
    expect( container.firstElementChild ).not.toHaveClass('step-container_hidden')
  })
})
