import { authApi } from "../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { MockUser } from "./fixtures/user.fixture";
import { ApiRoutes } from "../constants";

export const authMock = new MockAdapter(authApi, { delayResponse: 0 });

authMock.onPost(ApiRoutes.LOGIN).reply(200, MockUser);
authMock.onPost(ApiRoutes.REGISTER).reply(200, MockUser);
authMock.onPost(ApiRoutes.LOGOUT).reply(200, MockUser);
