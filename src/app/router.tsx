import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useMemo } from "react";

import routesConfig from "./routes.tsx";

export const CreateAppRouter = () => createBrowserRouter(routesConfig);

export const AppRouter = () => {
    const router = useMemo(() => CreateAppRouter(), []);
    return <RouterProvider router={router} />;
};
