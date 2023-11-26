import { ICreateUserStepProps } from "..";
import CredentialCard from "../../CredentialCard";
import InterestToggle from "../../InterestToggle";
import { currentCategories } from "./StepInterests";

const StepConfirmation = ({
  watch,
}: ICreateUserStepProps & { completed: boolean }) => {
  const day = watch?.birthdayDay || 2;
  const month = watch?.birthdayMonth || "5";
  const year = watch?.birthdayYear || 1999;
  const interests = watch?.interests || [];
  const categories = currentCategories.filter((category) =>
    interests.includes(category.label)
  );
  const birthday = new Date(`${month}/${day}/${year}`);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="w-full flex items-start justify-start">
        <h2 className="font-semibold">Eai, tudo certo?</h2>
      </div>
      <CredentialCard
        name={watch?.firstName || ""}
        lastName={watch?.lastName || ""}
        image={watch?.image || ""}
        email={watch?.email || ""}
        nickName={watch?.nickName || ""}
        birthday={birthday}
      />
      <div className="w-full flex items-start justify-start">
        <h2 className="font-semibold">Seus interesses</h2>
      </div>
      <InterestToggle
        categories={categories}
        onPressedChange={() => {}}
        selecteds={interests}
      />
    </div>
  );
};

export default StepConfirmation;
