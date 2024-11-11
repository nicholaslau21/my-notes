import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import setupStore, { AppStore, RootState } from "../stores";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routesConfig from "../app/routes";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    url?: string[],
    index?: number,
    {
        preloadedState = {},

        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    const router = createMemoryRouter(routesConfig, {
        initialEntries: url ? url : ["/"],
        initialIndex: index,
    });

    function Wrapper(): JSX.Element {
        return (
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
