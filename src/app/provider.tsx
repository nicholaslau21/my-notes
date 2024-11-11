import { Provider } from "react-redux";
import setupStore from "../stores/index.ts";

type AppProviderProps = {
    children: React.ReactNode;
};

const store = setupStore();

export const AppProvider = ({ children }: AppProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};
