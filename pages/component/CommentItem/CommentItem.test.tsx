import { render, screen, act } from "@testing-library/react";
import CommentItem from "./CommentItem";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        by: "danieg",
        descendants: 101,
        id: 35627107,
        kids: [35628027, 35627475, 35627904, 35627413],
        score: 212,
        time: 1681905950,
        title:
          "Making a Linux home server sleep on idle and wake on demand – the simple way",
        type: "story",
        url: "https://dgross.ca/blog/linux-home-server-auto-sleep/",
      }),
  })
) as jest.Mock;

describe("CommentItem", () => {
  it("Fetch", async () => {
    await act(() => render(<CommentItem id={343423534} />));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/danieg/i)).toBeInTheDocument();
  });

  it("snapshot", () => {
    const { container } = render(<CommentItem id={343423534} />);
    expect(container).toMatchSnapshot();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
});
