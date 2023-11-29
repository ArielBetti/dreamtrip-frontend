import React from "react";
import { IReserveStepProps } from "..";
import StarRating from "../../StarRating";
import { Card } from "@/components/ui/card";
import {
  calculateNumberOfNights,
  calculeTotalPrice,
  calculeTotalPriceByDay,
  formatedPrice,
  normalizeDateWithYear,
  pluralize,
} from "@/lib/utils";
import CreditCard from "../../CreditCard";

const StepConfirmation = ({
  watch,
  data,
  reserveDate,
  travelers,
}: IReserveStepProps) => {
  if (!data) return null;

  return (
    <Card className="p-5 w-full h-full flex flex-col gap-2 items-start justify-start">
      <div className="flex items-start justify-start gap-2 max-md:flex-col w-full">
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <h2 className="font-semibold text-xl">Quem faz a reserva</h2>
          <div>
            <p className="text-muted-foreground text-sm">Nome:</p>
            <p>{`${watch?.firstName} ${watch?.lastName}`}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Email:</p>
            <p>{watch?.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-auto gap-2">
          <h2 className="font-semibold text-xl">Pagamento</h2>
          <CreditCard
            cardNumber={watch?.paymentMethod?.cardNumber || 0}
            cardholderName={watch?.paymentMethod?.cardholderName || ""}
            cvv={watch?.paymentMethod?.cvv || 0}
            expirationDate={
              watch?.paymentMethod?.expirationDate || { month: 0, year: 0 }
            }
            hiddenNumber={true}
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-muted my-2"></div>
      <h2 className="font-semibold text-xl">Destino</h2>
      <div className="flex items-start justify-between gap-5 w-full max-md:flex-col">
        <div className="flex flex-col items-start justify-start gap-2">
          <StarRating rating={data?.rating || 0} />
          <div>
            <h2 className="font-semibold text-xl">{data?.name}</h2>
            <p className="text-sm">
              {data?.location.city} - {data?.location.state} -{" "}
              {data?.location.country}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              Duração total da hospedagem:
            </p>
            <p>
              {calculateNumberOfNights(
                new Date(reserveDate?.from || ""),
                new Date(reserveDate?.to || "")
              )}{" "}
              {pluralize(
                "diária",
                calculateNumberOfNights(
                  new Date(reserveDate?.from || ""),
                  new Date(reserveDate?.to || "")
                )
              )}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Hóspedes:</p>
            <p>
              {travelers} {pluralize("hóspede", travelers || 1)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Data de entrada:</p>
            <p>{normalizeDateWithYear(new Date(reserveDate?.from || ""))}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Data de saída:</p>
            <p>{normalizeDateWithYear(new Date(reserveDate?.to || ""))}</p>
          </div>

          <div className="font-semibold">
            <p className="text-lg">Preço:</p>
            <p className="text-orange-500 text-xl">
              {formatedPrice(
                calculeTotalPriceByDay(
                  calculeTotalPrice(
                    data?.price || 0,
                    travelers || 1,
                    data?.additionalPerPerson || 0,
                    data?.capacityPeople
                  ),
                  new Date(reserveDate?.from || ""),
                  new Date(reserveDate?.to || "")
                ),
                travelers || 1,
                data?.additionalPerPerson || 0,
                data?.capacityPeople
              )}{" "}
            </p>
          </div>
        </div>
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full max-w-lg h-auto rounded-xl max-md:max-w-full"
        />
      </div>
    </Card>
  );
};

export default StepConfirmation;
