import { render, screen } from "@testing-library/react";
import App from "@/App";
import client from "@/apolloClient";
import { ApolloProvider } from "@apollo/client";
import userEvent from "@testing-library/user-event";


vi.mock("@/components/charts/UsedLanguages", () => ({
  default: () => <div>Used Languages</div>,
}));

vi.mock("@/components/charts/PopularRepos", () => ({
  default: () => <div>Popular Repos</div>,
}));

vi.mock("@/components/charts/ForkedRepos", () => ({
  default: () => <div>Forked Repos</div>,
}));


const renderApp = () => {
    render(
        <ApolloProvider client={client}>
            <App  />
        </ApolloProvider>
    );
    
};

describe("App Integration", () => {
    // Test case: Verify that the profile updates when searching for a new user
    test("should undate profile when searching for a user", async () => {
        const user = userEvent.setup();
        renderApp();

        //Verify the default user is displayed initially
        expect(await screen.findByText("quincylarson")).toBeInTheDocument();

        const searchInput = screen.getByRole("textbox");

        // Simulate user interaction: clear the input and type a new username
        await user.clear(searchInput);
        await user.type(searchInput, "john_doe");
        
        // Simulate form submission
        const submitButton = screen.getByRole("button", {name: /search/i });
        await user.click(submitButton);

        // Verify that the new user's information is displayed
        expect(await screen.findByText("john_doe")).toBeInTheDocument();

        //Verify that the user's avatar and prfogile link are update correctly
        expect(await screen.findByRole("img")).toHaveAttribute("src", "https://github.com/images/john_doe.jpg");
        expect(await screen.findByRole("link")).toHaveAttribute("href", "https://github.com/john_doe");
    });

    test("should show error for ivalid username", async () => {
      const user = userEvent.setup();
      renderApp();

       // Simulate searching for an invalid username
       const searchInput = screen.getByRole("textbox");
       await user.clear(searchInput);
       await user.type(searchInput, "invalid-username");

       const submitButton = screen.getByRole("button", { name: /search/i });
       await user.click(submitButton);

        // Verify that the appropriate error message is displayed
        expect(
          await screen.findByText(/could not resolve to a user/i)).toBeInTheDocument();
    });
    // Test case: Verify error handling for failed API requests
    test("should show error when request fails", async () => {
      const user = userEvent.setup();
      renderApp();

      // Simulate a failed reqiest scenario
      const searchInput = screen.getByRole("textbox");
      await user.clear(searchInput);
      await user.type(searchInput, "request-error");

      const submitButton = screen.getByRole("button", {name: /search/i});
      await user.click(submitButton);

      // Verify that the generic error message is displayed
      expect(await screen.findByText("there was an error")).toBeInTheDocument();
    
    });
});