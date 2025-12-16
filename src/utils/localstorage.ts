export const setAuthStorage = (userId: number, userName: string) => {
  localStorage.setItem("userId", userId.toString());
  localStorage.setItem("userName", userName);
};

export const isLoggedIn = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  return Boolean(userId && userName);
};

export const getLocalStorage = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};
