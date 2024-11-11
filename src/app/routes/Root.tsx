import { Outlet, useRouteError } from "react-router-dom";
import Sidebar from "../../features/sidebar/components/Sidebar";

function RootLayout() {
    return (
        <main className="h-screen flex">
            <Sidebar />
            <Outlet />
        </main>
    );
}

export function RootErrorBoundary() {
    const error = useRouteError();

    return (
        <div
            id="error-page"
            className="flex flex-col items-center justify-center w-screen"
        >
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>
                    {(error as Error)?.message ||
                        (error as { statusText?: string })?.statusText}
                </i>
            </p>
        </div>
    );
}

export default RootLayout;
