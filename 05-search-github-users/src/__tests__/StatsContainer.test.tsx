import {render, screen}  from "@testing-library/react";
import StatsContainer from "@/components/user/StatsContainer";

describe("StatsContainer", () => {
    test("renders all stats cards with correct value", () => {
         // Mock data representing a GitHub user's statistics
         const props = {
            totalRepos: 25,
            followers: 100,
            following: 50,
            gists: 10,
         };

         render(<StatsContainer {...props} />);
          // Verify the repositories card displays correctly
          expect(screen.getByText("Total Repositories")).toBeInTheDocument();
          expect(screen.getByText("25")).toBeInTheDocument();

          // Verify the followers card displays correctly
          expect(screen.getByText("Followers")).toBeInTheDocument();
          expect(screen.getByText("100")).toBeInTheDocument();

           // Verify the following card displays correctly
           expect(screen.getByText("Following")).toBeInTheDocument();
           expect(screen.getByText("50")).toBeInTheDocument();
           // Verify the gists card displays correctly
           expect(screen.getByText("Gists")).toBeInTheDocument();
           expect(screen.getByText("10")).toBeInTheDocument();
        });
});