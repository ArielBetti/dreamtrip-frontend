import { TCreditCardInfo } from "@/interfaces/wallet";
import chip from "./assets/chip.png";
import { cn } from "@/lib/utils";

const CreditCard = ({
  cardNumber,
  cardholderName,
  expirationDate,
  hiddenNumber,
}: TCreditCardInfo & { hiddenNumber: boolean }) => {
  function applyCardMask(cardNumber: number): string {
    if (cardNumber.toString().length < 4) {
      return "Invalid card number";
    }

    const lastFourDigits = cardNumber.toString().slice(-4);
    const mask = "●".repeat(cardNumber.toString().length - 4);

    const groupedMask = mask.replace(/(.{4})/g, "$1 ");

    const maskedNumber = `${groupedMask} ${lastFourDigits}`;

    return maskedNumber;
  }

  const getCardStyle = (cardNumber: number): string => {
    const cleanedNumber = cardNumber.toString().replace(/\D/g, "");

    if (/^4/.test(cleanedNumber)) {
      return "bg-blue-600 text-neutral-100";
    } else if (/^5[5-9]/.test(cleanedNumber)) {
      return "bg-purple-600 text-neutral-100";
    } else if (
      /^4(?:011|523\d{2}|8888|89\d{2})\d{12}$|^5[0-9]{15}$/.test(cleanedNumber)
    ) {
      return "bg-zinc-950 text-neutral-100";
    } else if (/^5[1-5]/.test(cleanedNumber)) {
      return "bg-neutral-200 text-neutral-900";
    } else if (/^3[47]/.test(cleanedNumber)) {
      return "bg-green-700 text-neutral-100";
    } else {
      return "bg-white text-zinc-800";
    }
  };

  return (
    <div
      className={cn(
        "min-w-[250px] max-w-[300px] w-full min-h-[150px] flex-col gap-2 items-start justify-start py-2 px-4 rounded-sm shadow-[0px_0px_5px_0px] shadow-zinc-900/90 border",
        getCardStyle(cardNumber)
      )}
    >
      <div className="flex items-center justify-between w-full">
        <img className="h-7 w-7" src={chip} alt="chip" />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <p className="py-3">
          {hiddenNumber ? applyCardMask(cardNumber) : cardNumber}
        </p>
        <div className="flex w-full items-start justify-between">
          <p className="uppercase font-semibold">{cardholderName}</p>
          <div className="flex flex-col items-start justify-start text-sm">
            <p>validade</p>
            <p>{`${expirationDate.month}/${expirationDate.year}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
