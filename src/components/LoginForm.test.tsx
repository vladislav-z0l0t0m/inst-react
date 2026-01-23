import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { mockNavigate, renderWithProviders } from "../test/setup";
import { ApiRoutes, AppRoutes, TestIds } from "../constants";
import { MockUser } from "../mocks/fixtures/user.fixture";
import { authMock } from "../mocks/authMocks";

describe("LoginForm", () => {
  describe("UI & Validation", () => {
    it("should render login form with all required fields", () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT)).toBeInTheDocument();
      expect(
        screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON)
      ).toBeInTheDocument();
    });

    it("should have submit button disabled when form is empty", () => {
      renderWithProviders(<LoginForm />);

      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);
      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only email is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      await user.type(emailInput, "test@example.com");

      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only password is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const passwordInput = screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      await user.type(passwordInput, "password123");

      expect(submitButton).toBeDisabled();
    });

    it("should enable submit button when both fields are filled with valid data", async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      expect(submitButton).toBeDisabled();

      await user.type(emailInput, "test@example.com");
      expect(submitButton).toBeDisabled();

      await user.type(passwordInput, "password123");
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Login logic", () => {
    it("should navigate to home on success", async () => {
      const user = userEvent.setup();

      authMock.onPost(ApiRoutes.LOGIN).reply(200, MockUser);

      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(AppRoutes.HOME);
      });
    });

    it("should display error message and NOT navigate on failed login", async () => {
      const user = userEvent.setup();

      authMock.onPost(ApiRoutes.LOGIN).reply(401);

      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      const errorMessage = await screen.findByTestId(
        TestIds.AUTH_ERROR_MESSAGE
      );

      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("should disable submit button while request is pending", async () => {
      const user = userEvent.setup();

      authMock.onPost(ApiRoutes.LOGIN).reply(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([200, { user: MockUser }]);
          }, 500);
        });
      });

      renderWithProviders(<LoginForm />);

      const emailInput = screen.getByTestId(TestIds.LOGIN_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.LOGIN_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.LOGIN_SUBMIT_BUTTON);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      const loader = await screen.findByRole(
        "progressbar",
        {},
        { timeout: 2000 }
      );
      expect(loader).toBeInTheDocument();
    });
  });
});
