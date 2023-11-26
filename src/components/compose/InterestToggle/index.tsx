import { Toggle } from "@/components/ui/toggle";
import IconComponent from "@/icons";
import { ITravelGenericCategory } from "@/interfaces/travel";

interface IInterestToggleProps {
  categories: ITravelGenericCategory[];
  selecteds: string[];
  onPressedChange: (name: string) => void;
}

const InterestToggle = ({
  onPressedChange,
  categories,
  selecteds,
}: IInterestToggleProps) => {
  return (
    <div className="flex items-start justify-start gap-2 flex-wrap w-full">
      {categories.map((category, index) => (
        <Toggle
          key={`${category.label}-${index}`}
          onPressedChange={() => onPressedChange(category.label)}
          value={category.label}
          variant="outline"
          pressed={selecteds.includes(category.label)}
          className="capitalize"
        >
          <IconComponent name={category.icon} className="mr-2 h-4 w-4" />
          {category.label}
        </Toggle>
      ))}
    </div>
  );
};

export default InterestToggle;
