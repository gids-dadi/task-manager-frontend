import taskApi from ".";

export const signup = (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return taskApi.post("/auth/signup", data);
};

export const login = (data: { email: string; password: string }) => {
  return taskApi.post("/auth/login", data).then((res) => res.data);
};
