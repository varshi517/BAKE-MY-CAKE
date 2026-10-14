import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";
import App from "./App";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTreats = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    type: "Cake",
    price: 699,
    eggless: true,
    dietaryTags: ["Eggless"],
    description: "Rich chocolate cake with creamy frosting.",
    image: "https://example.com/cake.jpg",
  },
  {
    id: 2,
    name: "Chocolate Chip Cookies",
    type: "Cookie",
    price: 199,
    eggless: false,
    dietaryTags: ["Classic"],
    description: "Freshly baked chocolate chip cookies.",
    image: "https://example.com/cookies.jpg",
  },
  {
    id: 3,
    name: "Fudgy Brownie",
    type: "Brownie",
    price: 249,
    eggless: true,
    dietaryTags: ["Eggless"],
    description: "Soft and fudgy chocolate brownie.",
    image: "https://example.com/brownie.jpg",
  },
];

beforeEach(() => {
  localStorage.clear();

  mockedAxios.get.mockResolvedValue({
    data: mockTreats,
  } as any);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Bake Palace App", () => {
  test("renders bakery treats after loading the catalog", async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Dream Cake")
      ).not.toBeNull();
    });

    expect(
      screen.queryByText("Chocolate Chip Cookies")
    ).not.toBeNull();

    expect(
      screen.queryByText("Fudgy Brownie")
    ).not.toBeNull();
  });

  test("searches treats by name", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Dream Cake")
      ).not.toBeNull();
    });

    const searchBox = screen.getByPlaceholderText(
      "Search cakes, cookies, brownies..."
    );

    await user.type(searchBox, "Brownie");

    expect(
      screen.queryByText("Fudgy Brownie")
    ).not.toBeNull();

    expect(
      screen.queryByText("Chocolate Dream Cake")
    ).toBeNull();

    expect(
      screen.queryByText("Chocolate Chip Cookies")
    ).toBeNull();
  });

  test("filters treats by category", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Dream Cake")
      ).not.toBeNull();
    });

    await user.click(
      screen.getByRole("button", { name: "Cakes" })
    );

    expect(
      screen.queryByText("Chocolate Dream Cake")
    ).not.toBeNull();

    expect(
      screen.queryByText("Chocolate Chip Cookies")
    ).toBeNull();

    expect(
      screen.queryByText("Fudgy Brownie")
    ).toBeNull();
  });

  test("filters treats using the Eggless only option", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Chip Cookies")
      ).not.toBeNull();
    });

    const egglessOption = screen.getByText("Eggless only");

    await user.click(egglessOption);

    expect(
      screen.queryByText("Chocolate Dream Cake")
    ).not.toBeNull();

    expect(
      screen.queryByText("Fudgy Brownie")
    ).not.toBeNull();

    expect(
      screen.queryByText("Chocolate Chip Cookies")
    ).toBeNull();
  });

  test("adds a treat to My Picks", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Dream Cake")
      ).not.toBeNull();
    });

    const favoriteButton = screen.getByRole("button", {
      name: "Toggle Chocolate Dream Cake in My Picks",
    });

    await user.click(favoriteButton);

    /*
      After clicking the heart, the treat remains in the
      main catalog and also appears in the My Picks section.
    */
    expect(
      screen.getAllByText("Chocolate Dream Cake").length
    ).toBeGreaterThan(1);
  });

  test("combines category and eggless filtering", async () => {
    const user = userEvent.setup();

    render(<App />);

    await waitFor(() => {
      expect(
        screen.queryByText("Chocolate Dream Cake")
      ).not.toBeNull();
    });

    await user.click(
      screen.getByRole("button", { name: "Cakes" })
    );

    await user.click(
      screen.getByText("Eggless only")
    );

    expect(
      screen.queryByText("Chocolate Dream Cake")
    ).not.toBeNull();

    expect(
      screen.queryByText("Chocolate Chip Cookies")
    ).toBeNull();

    expect(
      screen.queryByText("Fudgy Brownie")
    ).toBeNull();
  });
});