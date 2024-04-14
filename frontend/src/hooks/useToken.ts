import { useState } from "react";

export default function useToken() {
  const getToken = (): string => {
    const tokenString = localStorage.getItem("token");
    return tokenString ? JSON.parse(tokenString) : "";
  };

  const [token, setToken] = useState<string>(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
