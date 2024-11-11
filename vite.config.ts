import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/testing/setup-tests.ts",
        exclude: ["**/node_modules/**", "**/e2e/**"],
        coverage: {
            include: ["src/**"],
        },
    },
});
