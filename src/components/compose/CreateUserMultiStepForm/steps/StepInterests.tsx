import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { ITravelGenericCategory } from "@/interfaces/travel";
import { ICreateUserStepProps } from "..";
import InterestToggle from "../../InterestToggle";

export const currentCategories: ITravelGenericCategory[] = [
  {
    icon: "island",
    label: "praias",
  },
  {
    icon: "florest",
    label: "florestas",
  },
  {
    icon: "party",
    label: "festas",
  },
  {
    icon: "mountain",
    label: "montanhas",
  },
  {
    icon: "sports",
    label: "esportes",
  },
  {
    icon: "desert",
    label: "desertos",
  },
  {
    icon: "tractor",
    label: "fazendas",
  },
  {
    icon: "food",
    label: "comidas",
  },
];

const StepInterests = ({ control }: ICreateUserStepProps) => {
  return (
    <div className="flex flex-col w-full items-start justify-start gap-5">
      <h2>Escolha seus interesses</h2>
      <FormField
        control={control}
        name="interests"
        render={({ field }) => (
          <FormItem className="block">
            <FormControl>
              <InterestToggle
                categories={currentCategories}
                selecteds={field.value || []}
                onPressedChange={(name) => {
                  if (field.value) {
                    if (field.value.includes(name)) {
                      field.onChange(
                        field.value.filter(
                          (interest: string) => interest !== name
                        )
                      );
                    } else {
                      field.onChange([...field.value, name]);
                    }
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepInterests;
