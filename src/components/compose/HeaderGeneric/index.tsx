import { Button } from "@/components/ui/button";
import UserDropdown from "../UserDropdown";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/routes/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore, useHeader } from "@/store";

const HeaderGeneric = () => {
  const navigate = useNavigate();
  const { loading, title } = useHeader();
  const { user } = useAuthStore();

  const handleGoBack = () => {
    const verifyHistory = navigate.length > 1;
    verifyHistory ? navigate(-1) : navigate(ROUTE.home);
  };

  return (
    <div className="w-full bg-background border-b border-b-muted fixed top-0 left-0 py-2 z-50 shadow-sm">
      <div className="container m-auto px-4 flex items-center justify-between w-full">
        <Button
          className="p-0 hover:bg-transparent"
          variant="ghost"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon className="h-5 w-5 text-muted-foreground fill-muted" />
        </Button>
        {loading ? (
          <Skeleton className="h-4 w-[170px]" />
        ) : (
          <h1 className="font-semibold animate-slowDownSlide">{title}</h1>
        )}
        <UserDropdown hasUser={!!user} />
      </div>
    </div>
  );
};

export default HeaderGeneric;
