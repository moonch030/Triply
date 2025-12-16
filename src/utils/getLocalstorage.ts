export const setAuthStorage = (userId: number, userName: string) => {
  localStorage.setItem("userId", String(userId));
  localStorage.setItem("userName", userName);
};

export const isLoggedIn = () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    return Boolean(userId && userName);
};
