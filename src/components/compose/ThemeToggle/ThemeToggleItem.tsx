import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { AppStrings } from "@/strings/app.strings";
import { MonitorSmartphone, Moon, Sun, WavesIcon } from "lucide-react";

const ThemeToggleItem = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="mr-2 absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span>Alterar tema</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>{AppStrings.themeLight}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>{AppStrings.themeDark}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("darkblue")}>
            <WavesIcon className="mr-2 h-4 w-4" />
            <span>{AppStrings.themeDarkBlue}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <MonitorSmartphone className="mr-2 h-4 w-4" />
            <span>{AppStrings.themeSystem}</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

export default ThemeToggleItem;
