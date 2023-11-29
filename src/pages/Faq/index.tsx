import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { faqQuestions } from "@/mocks/faq";

const Faq = () => {
  return (
    <div className="container m-auto px-4">
      <div className="h-full min-h-screen py-16 flex flex-col items-center justify-center">
        <div className="max-w-xl">
          <h2 className="font-semibold text-xl text-center">
            Como podemos ajudar ?
          </h2>
          <div className="max-w-xl flex flex-col my-2 items-start justify-start w-full"></div>
          <Accordion type="single" collapsible className="w-full">
            {faqQuestions.map((question, index) => (
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className="text-left items-start justify-start">
                  {question.title}
                </AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Card className="my-6 py-5 flex items-center justify-center flex-col">
            <p>Ficou alguma dúvida? Entre em contato conosco pelo email</p>
						<p className="mt-2 font-semibold">sac@dreamtrip.com.br</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Faq;
