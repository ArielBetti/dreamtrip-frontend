import ReserveFormMultiStep from "@/components/compose/ReserveFormMultiStep";
import StarRating from "@/components/compose/StarRating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  calculateNumberOfNights,
  calculeTotalPrice,
  calculeTotalPriceByDay,
  cn,
  formatedPrice,
  normalizeDateWithYear,
  pluralize,
} from "@/lib/utils";
import { useGetSingleTravel } from "@/queries/useGetSingleTravel";
import { ROUTE } from "@/routes/routes";
import { useHeaderActions } from "@/store";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Reserve = () => {
  const [complete, setComplete] = useState(false);
  const { setHeader } = useHeaderActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const { data, isLoading, isError } = useGetSingleTravel(id || "1");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const travelers = queryParams.get("travelers");

  if (isLoading) return <div>carregando...</div>;

  if (isError) return <div>Erro ao carregar a viagem</div>;

  const onSubmitForm = () => {
    setComplete(true);
  };

  setHeader({
    loading: false,
    title: "Reserva",
  });

  return (
    <div
      className={cn(
        "min-h-screen py-16 container m-auto px-4",
        !complete && "pb-[calc(8rem+5vh)]"
      )}
    >
      <div
        className={cn(
          "flex items-start justify-start gap-5 lg:flex-row flex-col lg:h-[calc(100vh-8rem)]",
          complete && "h-[calc(100vh-8rem)]"
        )}
      >
        {!complete && (
          <Card className="p-5 lg:w-[45%] w-full h-full flex flex-col gap-2 items-start justify-start">
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
                  new Date(startDate || ""),
                  new Date(endDate || "")
                )}{" "}
                {pluralize(
                  "diária",
                  calculateNumberOfNights(
                    new Date(startDate || ""),
                    new Date(endDate || "")
                  )
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Hóspedes:</p>
              <p>
                {travelers}{" "}
                {pluralize("hóspede", parseInt(travelers || "1", 10))}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Data de entrada:</p>
              <p>{normalizeDateWithYear(new Date(startDate || ""))}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Data de saída:</p>
              <p>{normalizeDateWithYear(new Date(endDate || ""))}</p>
            </div>

            <div className="font-semibold">
              <p className="text-lg">Preço:</p>
              <p className="text-orange-500 text-xl">
                {formatedPrice(
                  calculeTotalPriceByDay(
                    calculeTotalPrice(
                      data?.price || 0,
                      parseInt(travelers || "1", 10),
                      data?.additionalPerPerson || 0,
                      data?.capacityPeople
                    ),
                    new Date(startDate || ""),
                    new Date(endDate || "")
                  ),
                  parseInt(travelers || "1", 10),
                  data?.additionalPerPerson || 0,
                  data?.capacityPeople
                )}{" "}
              </p>
            </div>
          </Card>
        )}
        <div className="w-full h-full py-1">
          {complete && (
            <div className="flex justify-center items-center flex-col w-full h-full gap-2 text-center">
              <CheckIcon className="w-20 h-20 text-green-500" />
              <p className="text-center text-lg font-semibold">
                Reserva realizada com sucesso!
              </p>
              <p className="text-sm text-muted-foreground">
                Em breve você receberá um email com os detalhes da sua reserva.
              </p>
              <Button
                onClick={() => navigate(ROUTE.home)}
                variant="outline"
                type="button"
                className="my-5"
              >
                Voltar para página inicial
              </Button>
            </div>
          )}
          {data && !complete && (
            <ReserveFormMultiStep
              travelers={Number(travelers) || 1}
              data={data}
              reserveDate={{
                from: startDate || "",
                to: endDate || "",
              }}
              complete={complete}
              onSubmit={onSubmitForm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reserve;
