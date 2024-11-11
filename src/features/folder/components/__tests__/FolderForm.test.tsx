import { screen } from "@testing-library/react";
import Sidebar from "../../../sidebar/components/Sidebar";
import { renderWithProviders } from "../../../../testing/test-utils";
import userEvent from "@testing-library/user-event";

describe("when the save button is clicked", () => {
    it("should close the modal", async () => {
        const user = userEvent.setup();
        renderWithProviders(<Sidebar />);
        await user.click(screen.getByRole("button", { name: "New Folder" }));

        const input = screen.getByRole("textbox", { name: "Name" });
        await user.type(input, "Todo");

        const saveBtn = screen.getByRole("button", { name: "Save" });
        await user.click(saveBtn);

        expect(
            screen.queryByRole("heading", { name: "New Folder" })
        ).toBeNull();
        expect(screen.queryByRole("textbox", { name: "Name" })).toBeNull();
    });

    it("should save the entered folder", async () => {
        const user = userEvent.setup();
        renderWithProviders(<Sidebar />);
        await user.click(screen.getByRole("button", { name: "New Folder" }));

        const input = screen.getByRole("textbox", { name: "Name" });
        await user.type(input, "Games");

        const saveBtn = screen.getByRole("button", { name: "Save" });
        await user.click(saveBtn);

        expect(screen.getByText("Games")).toBeVisible();
    });
});

it("should close the modal, when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);
    await user.click(screen.getByRole("button", { name: "New Folder" }));

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(screen.queryByRole("heading", { name: "New Folder" })).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Name" })).toBeNull();
});
