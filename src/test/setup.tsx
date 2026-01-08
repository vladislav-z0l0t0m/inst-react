import { authMock } from "../mocks/authMocks";
import "@testing-library/jest-dom";
import { afterEach, vi, expect } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactElement } from "react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
  authMock.resetHandlers();
  vi.clearAllMocks();
});

export const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: {
        retry: false,
      },
    },
  });

export function renderWithProviders(ui: ReactElement) {
  const testQueryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>{ui}</BrowserRouter>
      </QueryClientProvider>
    ),
    queryClient: testQueryClient,
  };
}
