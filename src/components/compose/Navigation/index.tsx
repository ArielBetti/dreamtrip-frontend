import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTE } from "@/routes/routes";
import { useUser } from "@/store";
import {
  BadgeInfoIcon,
  CalendarCheck2Icon,
  HomeIcon,
  Wallet2Icon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUser();

  return (
    <div className="w-full bg-background border-t border-t-muted fixed bottom-0 left-0 py-2 z-50 shadow-sm">
      <div className="container m-auto px-4 flex items-center justify-center w-full gap-8 text-muted-foreground text-xs">
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            location.pathname === ROUTE.home && "text-primary"
          )}
        >
          <Button
            className="p-0 hover:bg-transparent h-6"
            variant="ghost"
            onClick={() => navigate(ROUTE.home)}
          >
            <HomeIcon className="h-5 w-5 fill-muted" />
          </Button>
          <p>Inicio</p>
        </div>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            location.pathname === "todo"
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <Button
            className="p-0 hover:bg-transparent h-6"
            variant="ghost"
            onClick={() => navigate(ROUTE.home)}
          >
            <BadgeInfoIcon className="h-5 w-5 text-muted-foreground fill-muted" />
          </Button>
          <p>Dicas</p>
        </div>
        {user && (
          <>
            <div
              className={cn(
                "flex flex-col items-center justify-center",
                location.pathname === "todo"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Button
                className="p-0 hover:bg-transparent h-6"
                variant="ghost"
                onClick={() => navigate(ROUTE.home)}
              >
                <CalendarCheck2Icon className="h-5 w-5 text-muted-foreground fill-muted" />
              </Button>
              <p>Reservas</p>
            </div>
            <div
              className={cn(
                "flex flex-col items-center justify-center",
                location.pathname === "todo"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Button
                className="p-0 hover:bg-transparent h-6"
                variant="ghost"
                onClick={() => navigate(ROUTE.home)}
              >
                <Wallet2Icon className="h-5 w-5 text-muted-foreground fill-muted" />
              </Button>
              <p>Carteira</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
