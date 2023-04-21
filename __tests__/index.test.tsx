import { render, screen, act } from "@testing-library/react";
import Home from "@/pages/index";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([35580845, 35580844]),
  })
) as jest.Mock;

describe("Home", () => {
  // act обертка для компонентов рандарюх повторно
  it("Fetch", async () => {
    await act(() => render(<Home />));

    expect(fetch).toHaveBeenCalledTimes(3);
    // expect(screen.getByText(/35580845/i)).toBeInTheDocument();
  });

  it("Render", async () => {
    render(<Home />);
    expect(screen.getByText(/RESET/i)).toBeInTheDocument();
  });

  it("snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
