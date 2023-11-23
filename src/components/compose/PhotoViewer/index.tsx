import ScrollContainer from "react-indiana-drag-scroll";
import { PhotoProvider, PhotoView } from "react-photo-view";

const PhotoViewer = ({ images }: { images: string[] }) => {
  return (
    <ScrollContainer vertical className="scroll-container flex gap-5">
      <PhotoProvider maskOpacity={0.85}>
        {images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <img
              className="w-[120px] h-[120px] rounded-2xl shadow-md"
              src={item}
              alt=""
            />
          </PhotoView>
        ))}
      </PhotoProvider>
    </ScrollContainer>
  );
};

export default PhotoViewer;
