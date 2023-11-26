import { cn, dataURLtoFile } from "@/lib/utils";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE } from "../validation";
import { Button } from "@/components/ui/button";
import { ICreateUserStepProps } from "..";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const StepImage = ({ control, watch }: ICreateUserStepProps) => {
  const editor = useRef<AvatarEditor>(null);
  const [image, setImage] = useState<File | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
      "image/tiff": [".tiff", ".tif"],
      "image/x-icon": [".ico"],
    },
  });

  const removeFile = () => {
    setImage(null);
  };

  useEffect(() => {
    const dataImage = watch?.image;
    if (dataImage) {
      setImage(dataURLtoFile(watch?.image || "", "profile-image"));
    }
  }, []);

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <section className="flex items-center justify-center flex-col gap-5">
              <div className="w-full flex items-start justify-start">
                <h1 className="font-semibold">Foto de perfil</h1>
              </div>
              <div
                {...getRootProps({
                  className: cn(
                    "p-2 border-2 border-dotted border-primary rounded-lg max-w-[250px] h-[250px]",
                    image
                      ? "hidden"
                      : "flex flex-col items-center justify-center gap-5 animate-fadeIn"
                  ),
                })}
              >
                <input
                  {...getInputProps({
                    placeholder: "Arraste ou clique para adicionar uma foto",
                    className: "bg-red-600 h-10 w-10",
                  })}
                />
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                  <PlusIcon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm text-center">
                  Arraste ou clique para adicionar uma foto
                </p>
              </div>
              {fileRejections.length > 0 && (
                <p className="text-red-600">Não suportamos essa imagem :(</p>
              )}
              <div
                className={cn(
                  "relative max-w-[250px] hidden",
                  image &&
                    "flex w-full items-center justify-center animate-fadeIn"
                )}
              >
                <div className="absolute top-0 right-0 z-30 flex flex-col items-center justify-center gap-2">
                  <Button
                    type="button"
                    onClick={() => {
											removeFile();
											field.onChange("");
										}}
                    variant="destructive"
                    className="rounded-full w-8 h-8 p-2"
                  >
                    <Trash2Icon className="w-30 h-30" />
                  </Button>
                </div>
                {(image || field.value) && (
                  <AvatarEditor
                    ref={editor}
                    className="relative rounded-lg bg-background border-2 border-primary border-dotted"
                    image={image?.name ? image : field.value || ""}
                    onImageReady={() =>
                      field.onChange(editor.current?.getImage().toDataURL())
                    }
                    onImageChange={() => {
                      if (timeoutId !== null) {
                        clearTimeout(timeoutId);
                      }

                      const newTimeoutId = window.setTimeout(() => {
                        field.onChange(editor.current?.getImage().toDataURL());
                      }, 120) as unknown as number;

                      setTimeoutId(newTimeoutId);
                    }}
                    width={200}
                    height={200}
                    scale={1}
                    rotate={0}
                    borderRadius={100}
                  />
                )}
              </div>
            </section>
          </FormControl>
          <FormDescription className="text-center">
            Você pode adicionar uma foto de perfil ou pular essa etapa
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StepImage;
