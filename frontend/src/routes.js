export const ORIGIN_URL = "http://localhost:3001";

export const routes = {
  user: "/user",
};

export const getRoute = (route) => `${ORIGIN_URL}${route}`;
