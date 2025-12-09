import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { authApi } from "../api/axiosInstance";

vi.mock("../api/axiosInstance", () => ({
  authApi: {
    post: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RegisterForm", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    );
  };

  describe("UI & Validation", () => {
    it("should render register form with all required fields", () => {
      renderWithProviders(<RegisterForm />);

      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /register/i })
      ).toBeInTheDocument();
    });

    it("should have submit button disabled when form is empty", () => {
      renderWithProviders(<RegisterForm />);

      const submitButton = screen.getByRole("button", { name: /register/i });
      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only username is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByPlaceholderText("Username");
      const submitButton = screen.getByRole("button", { name: /register/i });

      await user.type(usernameInput, "validuser");

      expect(submitButton).toBeDisabled();
    });

    it("should enable submit button when all fields are valid", async () => {
      const user = userEvent.setup();
      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByPlaceholderText("Username");
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /register/i });

      expect(submitButton).toBeDisabled();

      await user.type(usernameInput, "validuser");
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe("Register logic", () => {
    it("should call register API with correct payload and navigate home on success", async () => {
      const user = userEvent.setup();
      const mockPost = vi.mocked(authApi.post);

      mockPost.mockResolvedValueOnce({
        data: {
          user: {
            id: 1,
            email: "test@example.com",
            username: "validuser",
          },
        },
      });

      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByPlaceholderText("Username");
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /register/i });

      await user.type(usernameInput, "validuser");
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith("/register", {
          username: "validuser",
          email: "test@example.com",
          password: "password123",
        });
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    it("should display error message and not navigate on failed register", async () => {
      const user = userEvent.setup();
      const mockPost = vi.mocked(authApi.post);

      mockPost.mockRejectedValueOnce({
        response: {
          status: 400,
          data: { message: "Email already exists" },
        },
      });

      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByPlaceholderText("Username");
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /register/i });

      await user.type(usernameInput, "validuser");
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      const errorMessage = await screen.findByText(/email already exists/i);

      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  it("should disable submit button while request is pending", async () => {
    const user = userEvent.setup();
    const mockPost = vi.mocked(authApi.post);

    mockPost.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return { data: { message: "please wait..." } };
    });

    renderWithProviders(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.type(usernameInput, "validuser");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
