import { render, screen } from "@testing-library/react";
import UserCard from "@/components/user/UserCard";

describe("UserCard", () => {
  const mockProps = {
    avatarUrl: "https://example.com/avatar.jpg",
    name: "John Doe",
    bio: "Frontend Developer",
    url: "https://github.com/johndoe",
  };
  test("renders user information correctly", () => {
    render(<UserCard {...mockProps} />);

    // Verify user's name and bio is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    // Verify avatar image is present with correct attributes
    const avatarImage = screen.getByAltText("John Doe");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );

    // Verify follow button/link has correct attributes for external navigation
    const followLink = screen.getByRole("link", { name: /follow/i });
    expect(followLink).toHaveAttribute("href", "https://github.com/johndoe");
    expect(followLink).toHaveAttribute("target", "_blank");
    expect(followLink).toHaveAttribute("rel", "noreferrer");
  });

  // Test case: Verify fallback values when required fields are missing
  test("renders default values when name and bio are not provided ", () => {
    const propsWithoutNameAndBio = {
      ...mockProps,
      name: "",
      bio: "",
    };

    render(<UserCard {...propsWithoutNameAndBio} />);
    // Verify default name is used when name is empty
    expect(screen.getByText("Coding Addict")).toBeInTheDocument();

    // Verify default bio is used when bio is empty
    expect(
      screen.getByText("Passionate about coding and technology")
    ).toBeInTheDocument();
  });
});
