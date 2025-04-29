import { render, screen, logRoles, getByRole } from '@testing-library/react';
import Sandbox from './Sandbox';

describe("Sandbox Component", () => {
    test("renders nav and  navigation links", () => {
        const  { container } =render(<Sandbox />);
        logRoles(container);
        // const heading = screen.getByText(/testing/i);
        // expect(heading).toBeInTheDocument();

        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Home'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'About'})).toBeInTheDocument();
    });
    test('renders headings with correct hierarchy', () => {
        render(<Sandbox/>)
        expect(
            screen.getByRole('heading', {name: 'Main Heading', level: 1})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: "Subheading", level: 2})).toBeInTheDocument();
    });
    test('renders image with alt text', () => {
        render(<Sandbox />);
        expect(screen.getByRole('img', {name: /example/i})).toHaveAttribute('src', 'example.jpg')
    });
    // test('renders list', () => {
    //     render(<Sandbox />);
    //     expect(screen.getAllByRole('listitem')).toHaveLength(2);
    // });
    // test('renders cards', () => {
    //     render(<Sandbox />);
    //     expect(screen.getAllByRole('article')).toHaveLength(3);
    // })
    test('renders initial buttons', () => {
        render(<Sandbox />);

       expect(screen.getByRole('button', {name: 'Click me'})).toBeInTheDocument();
       expect(screen.getByRole('button', {name: 'Cansel'})).toBeInTheDocument();
    });
    test('error button is not initially visible', () => {
        render(<Sandbox />);

       expect(screen.queryByRole('button', {name: 'Error'})).not.toBeInTheDocument();
      
    });
    test('async button appears after delay', async() => {
        render(<Sandbox />);
        // Button should not be present initially
        const buttonName = /async button/i
       expect(screen.queryByRole('button', {name: buttonName})).not.toBeInTheDocument();
      // Wait for button to appear using findByRole
      const asyncButton = await screen.findByRole('button', {
        name: "Async Button",
      });
      expect(asyncButton).toBeInTheDocument();
    });
   
})