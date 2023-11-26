import {
  Bell,
  CreditCard,
  LogIn,
  LogOut,
  User,
  UserIcon,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import ThemeToggleItem from "../ThemeToggle/ThemeToggleItem";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/routes/routes";
import { TUser } from "@/interfaces/user";
import UserAvatar from "../UserAvatar";

interface IUserDropdownProps {
  user?: TUser | null;
}

const UserDropdown = ({ user }: IUserDropdownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="flex items-center justify-center bg-muted">
          {user ? (
            <UserAvatar userName={user.nickName} userImage={user.image || ""} />
          ) : (
            <UserIcon className="h-5 w-5" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Área do usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Meios de pagamento</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="relative">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notificações</span>
                <DropdownMenuShortcut>+99</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          {!user && (
            <>
              <DropdownMenuItem className="relative">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Entrar</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(ROUTE.createUser)}
                className="relative"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Criar conta</span>
              </DropdownMenuItem>
            </>
          )}
          <ThemeToggleItem />
          {user && (
            <DropdownMenuItem className="relative">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Desconectar</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
