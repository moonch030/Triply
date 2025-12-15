export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    console.log("[getCookie] document 없음 (SSR)");
    return null;
  }

  console.log("[getCookie] document.cookie:", document.cookie);

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, ...value] = cookie.split("=");

    console.log("[getCookie] 검사 중:", key, value.join("="));

    if (key === name) {
      const result = decodeURIComponent(value.join("="));
      console.log(`[getCookie] ${name} 찾음:`, result);
      return result;
    }
  }

  console.log(`[getCookie] ${name} 없음`);
  return null;
}

export const getToken = () => getCookie("id");
