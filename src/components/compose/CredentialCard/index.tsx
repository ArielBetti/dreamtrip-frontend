import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { normalizeNickName } from "@/lib/utils";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Card } from "@/components/ui/card";

interface ICredentialCardProps {
  name: string;
  lastName: string;
  image: string;
  email: string;
  nickName: string;
  birthday: Date;
}

const CredentialCard = ({
  birthday,
  email,
  lastName,
  name,
  nickName,
  image,
}: ICredentialCardProps) => {
  const nick = normalizeNickName(nickName);

  const userFallback = useMemo(() => {
    const [firstName, lastName] = nickName.split(" ");
    const firstNameFirstLetter = firstName?.charAt(0);
    const lastNameFirstLetter = lastName?.charAt(0) || "";
    const fallbackName = `${firstNameFirstLetter} ${lastNameFirstLetter}`;

    return fallbackName.toUpperCase();
  }, [nickName]);

  return (
    <Card className="flex items-start justify-start gap-5 p-5 w-full">
      <Avatar>
        <AvatarImage src={image} alt={nickName} />
        <AvatarFallback delayMs={600}>{userFallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="font-semibold">{nick}</h1>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Nome</p>
          <p>
            {name} {lastName}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Data de nascimento</p>
          <p>
            {format(birthday, "d 'de' MMMM 'em' YYY", {
              locale: ptBR,
            })}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CredentialCard;
