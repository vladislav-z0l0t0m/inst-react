import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./loginForm";
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

describe("LoginForm", () => {
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
    it("should render login form with all required fields", () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /login/i })
      ).toBeInTheDocument();
    });

    it("should have submit button disabled when form is empty", () => {
      renderWithProviders(<LoginForm />);

      const submitButton = screen.getByRole("button", { name: /login/i });
      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only email is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByPlaceholderText("Email");
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");

      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only password is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(passwordInput, "password123");

      expect(submitButton).toBeDisabled();
    });

    it("should enable submit button when both fields are filled with valid data", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /login/i });

      expect(submitButton).toBeDisabled();

      await user.type(emailInput, "test@example.com");
      expect(submitButton).toBeDisabled();

      await user.type(passwordInput, "password123");
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Login logic", () => {
    it("should call login API with correct credentials and navigate to home on success", async () => {
      const user = userEvent.setup();
      const mockPost = vi.mocked(authApi.post);

      mockPost.mockResolvedValueOnce({ data: { message: "SUUUUUIIIIII" } });

      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith("/login", {
          identifier: "test@example.com",
          identifierType: "email",
          password: "password123",
        });
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    it("should display error message and NOT navigate on failed login", async () => {
      const user = userEvent.setup();
      const mockPost = vi.mocked(authApi.post);

      mockPost.mockRejectedValueOnce({
        response: {
          status: 401,
          data: { message: "Invalid credentials" },
        },
      });
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      const errorMessage = await screen.findByText(/invalid credentials/i);

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
      return { data: { message: "wait a bit..." } };
    });

    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /login/i });

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
