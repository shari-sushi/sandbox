import { DeleteButton } from "./DeleteButton";

interface PrePostFilesProps {
  className?: string;
  hiddenButton?: boolean;
  images: PrePostImage[];
  setImages: React.Dispatch<React.SetStateAction<PrePostImage[]>>;
}

export interface PrePostImage {
  previewID: string;
  url: string;
  isLoading: boolean;
}

export const PrePostFiles = ({ className, hiddenButton, images, setImages }: PrePostFilesProps) => {
  if (images.length === 0) {
    return null;
  }

  const deleteImage = (uid: string) => {
    setImages((images) => images.filter((image) => image.previewID !== uid));
  };

  return (
    <div className={`relative rounded-md w-full select-none ${className}`}>
      <div className="flex h-fit gap-x-1 rounded-md">
        {images.map((image) => (
          <div key={`post_image_${image.previewID}`} className={`flex flex-1 justify-center  ${images.length === 1 ? "w-32 max-h-[455px]" : "h-32"}`}>
            {image.isLoading ? (
              <div className="relative h-20 w-20 flex justify-center items-center">
                <div className="flex absolute items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" className="fill-white opacity-80">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
                  </svg>
                  <div className="absolute animate-spin-slow h-8 w-8 border-2 rounded-full border-gray-300 border-t-transparent" />
                </div>
                {hiddenButton !== true && (
                  <div className="absolute flex top-0 right-0 bg-on-secondary-container rounded-md shadow-md">
                    <DeleteButton onClick={() => deleteImage(image.previewID)} />
                  </div>
                )}
              </div>
            ) : (
              <div className={`relative  ${images.length === 1 ? "w-fit" : "h-32 w-full"}`}>
                <img src={image.url} className={`w-full h-full rounded-md ${images.length === 1 ? "object-contain" : "object-cover"}`} />
                {hiddenButton !== true && (
                  <div className="absolute flex top-0.5 right-0.5 bg-on-secondary-container rounded-md shadow-md">
                    <DeleteButton onClick={() => deleteImage(image.previewID)} />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
