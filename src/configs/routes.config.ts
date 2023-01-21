const V1 = "v1";

const AUTH_ROOT = "auth";

export const routesV1 = {
  version: V1,
  auth: {
    root: AUTH_ROOT,
    signin: `/${AUTH_ROOT}/signin`,
    signup: `/${AUTH_ROOT}/signup`,
  },
};
