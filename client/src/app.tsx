import React, { useEffect, useState } from "react";
import Routes from "./routes";
import { accessTokenVar } from "./util/accessToken";

type Props = {};

const App: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      accessTokenVar(accessToken);
      setIsLoading(false);
    });
  });
  if (isLoading) return <div>Loading...</div>;
  return <Routes />;
};

export default App;
