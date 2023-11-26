import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMemo } from "react";

interface IUserAvatarProps {
  userName: string;
  userImage: string;
}

const UserAvatar = ({ userName, userImage }: IUserAvatarProps) => {
  const userFallback = useMemo(() => {
    const [firstName, lastName] = userName.split(" ");
    const firstNameFirstLetter = firstName?.charAt(0);
    const lastNameFirstLetter = lastName?.charAt(0) || "";
    const fallbackName = `${firstNameFirstLetter} ${lastNameFirstLetter}`;

    return fallbackName.toUpperCase();
  }, [userName]);
  return (
    <Avatar>
      <AvatarImage src={userImage} alt={userName} />
      <AvatarFallback delayMs={600}>{userFallback}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
