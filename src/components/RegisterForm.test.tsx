import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./RegisterForm";
import { mockNavigate, renderWithProviders } from "../test/setup";
import { ApiRoutes, AppRoutes, TestIds } from "../constants";
import { MockUser } from "../mocks/fixtures/user.fixture";
import { authMock } from "../mocks/authMocks";

describe("RegisterForm", () => {
  describe("UI & Validation", () => {
    it("should render register form with all required fields", () => {
      renderWithProviders(<RegisterForm />);

      expect(
        screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TestIds.REGISTER_EMAIL_INPUT)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TestIds.REGISTER_PASSWORD_INPUT)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON)
      ).toBeInTheDocument();
    });

    it("should have submit button disabled when form is empty", () => {
      renderWithProviders(<RegisterForm />);

      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);
      expect(submitButton).toBeDisabled();
    });

    it("should have submit button disabled when only username is filled", async () => {
      const user = userEvent.setup();
      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT);
      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);

      await user.type(usernameInput, "validuser");

      expect(submitButton).toBeDisabled();
    });

    it("should enable submit button when all fields are valid", async () => {
      const user = userEvent.setup();
      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT);
      const emailInput = screen.getByTestId(TestIds.REGISTER_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.REGISTER_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);

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
    it("should navigate to home page on success", async () => {
      const user = userEvent.setup();

      authMock.onPost(ApiRoutes.REGISTER).reply(200, MockUser);

      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT);
      const emailInput = screen.getByTestId(TestIds.REGISTER_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.REGISTER_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);

      await user.type(usernameInput, "validuser");
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(AppRoutes.PROFILE);
      });
    });

    it("should display error message and not navigate on failed register", async () => {
      const user = userEvent.setup();

      authMock.onPost(ApiRoutes.REGISTER).reply(401);

      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT);
      const emailInput = screen.getByTestId(TestIds.REGISTER_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.REGISTER_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);

      await user.type(usernameInput, "validuser");
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

      authMock.onPost(ApiRoutes.REGISTER).reply(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([200, { user: MockUser }]);
          }, 500);
        });
      });

      renderWithProviders(<RegisterForm />);

      const usernameInput = screen.getByTestId(TestIds.REGISTER_USERNAME_INPUT);
      const emailInput = screen.getByTestId(TestIds.REGISTER_EMAIL_INPUT);
      const passwordInput = screen.getByTestId(TestIds.REGISTER_PASSWORD_INPUT);
      const submitButton = screen.getByTestId(TestIds.REGISTER_SUBMIT_BUTTON);

      await user.type(usernameInput, "validuser");
      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await user.click(submitButton);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
