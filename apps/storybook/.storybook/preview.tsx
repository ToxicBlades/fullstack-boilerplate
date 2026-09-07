import { TooltipProvider } from "@project/design-system/components/ui/tooltip";
import { ThemeProvider } from "@project/design-system/providers/theme";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs";
import "@project/design-system/styles/globals.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      themes: { dark: "dark", light: "light" },
    }),
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <TooltipProvider>
          <div className="bg-background p-6 text-foreground antialiased">
            <Story />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
