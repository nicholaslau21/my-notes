import { NavLink } from "react-router-dom";

type Link = {
    key?: React.Key;
    to: string;
    onClick?: () => {};
    children: React.ReactNode;
};

export const Link = ({ to, onClick, children }: Link) => {
    return (
        <li className="p-2 text-sm sm:text-base">
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    isActive
                        ? "font-extrabold text-black-700"
                        : "font-semibold text-black-700"
                }
            >
                {children}
            </NavLink>
        </li>
    );
};
