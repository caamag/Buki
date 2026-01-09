import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../pages/home";

vi.mock("../../pages/home/useHome", () => ({
  useHome: () => ({
    loading: false,
    products: [
      {
        id: "1",
        name: "Livro 1",
        price: "29.90",
        image: "image1.jpg",
      },
      {
        id: "2",
        name: "Livro 2",
        price: "39.90",
        image: "image2.jpg",
      },
    ],
    goToCategories: vi.fn(),
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main heading and description", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /descubra seu próximo universo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/explore um mundo de livros do seu jeito/i)
    ).toBeInTheDocument();
  });

  it("renders the categories button and triggers goToCategories", () => {
    render(<Home />);
    const btn = screen.getByRole("button", { name: /explorar categorias/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });

  it("renders products and their details", () => {
    render(<Home />);
    expect(screen.getByText("Livro 1")).toBeInTheDocument();
    expect(screen.getByText("Livro 2")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /detalhes/i })).toHaveLength(
      2
    );
  });

  it("navigates to product details on button click", () => {
    render(<Home />);
    const detailButtons = screen.getAllByRole("button", { name: /detalhes/i });
    fireEvent.click(detailButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });

  it("renders the flex container for main content", () => {
    render(<Home />);
    const flexDiv = screen.getByText(
      /descubra seu próximo universo/i
    ).parentElement;
    expect(flexDiv).toHaveClass("flex", "flex-col", "items-center");
  });
});
