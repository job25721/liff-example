import { createContext, useEffect, useState } from "react";
import liff from "@line/liff";
import {} from "@line/liff";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./pages";
import Callback from "./pages/callback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
]);

interface Profile {
  userId: string;
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
}

interface Context {
  user: Profile | null;
}

export const AppContext = createContext({} as Context);

function App() {
  const [user, serUser] = useState<Profile | null>(null);

  useEffect(() => {
    const liffInit = async () => {
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID,
      });
      console.log("LIFF init success");
      if (liff.isLoggedIn()) {
        const token = await liff.getAccessToken();
        console.log(token);
        const profile = await liff.getProfile();
        serUser(profile as Profile);
      }
    };

    liffInit();
  }, []);

  return (
    <AppContext.Provider value={{ user }}>
      <div className="container max-w-lg mx-auto h-screen bg-white">
        <RouterProvider router={router} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
