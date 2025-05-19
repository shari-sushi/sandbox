import React, { useRef, useState } from "react";
import { PhotoIcon } from "./PhotoIcon";
import { DeleteButton } from "./DeleteButton";

export default function PostImagePage() {
  return <ImageComponent />;
}

// 参考：https://zenn.dev/yuyan/articles/f35da08770a135

const SUPPORTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

const MAX_ATTACHMENT_BYTE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ATTACHMENT_COUNT = 4;

export interface PrePostImage {
  previewID: string;
  url: string;
  isLoading: boolean;
}

export const ImageComponent = () => {
  const [imagePreviews, setImagePreviews] = useState<PrePostImage[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileLoad = (files: File[]) => {
    if (files.length === 0) {
      return;
    }

    if (imagePreviews.length + files.length > MAX_ATTACHMENT_COUNT) {
      return;
    }

    const items = Array.from(files);
    let totalFilesSize = 0;

    items.forEach((file) => {
      totalFilesSize += file.size;
      if (totalFilesSize > MAX_ATTACHMENT_BYTE_SIZE) {
        return;
      }

      const previewID = Math.random().toString().slice(2, 20);
      setImagePreviews((images) => [
        ...images,
        { previewID, url: "", isLoading: true },
      ]);

      // 読み込み中の状態を体験できるように遅延させている
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (typeof result !== "string") {
            return;
          }

          setImagePreviews((prevImages) =>
            prevImages.map((image) =>
              image.previewID === previewID
                ? { ...image, url: result, isLoading: false }
                : image
            )
          );
        };

        reader.onerror = () => {};

        reader.readAsDataURL(file as Blob);
      }, 600);
    });

    // NOTE: 同じファイルを重複選択できるようにしてる
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files == null) return;
    handleFileLoad(Array.from(files));
  };

  const handlePasteFile = (
    pasteEvent: React.ClipboardEvent<HTMLDivElement>
  ) => {
    handleFileLoad(
      Array.from(pasteEvent.clipboardData.items).reduce((files, item) => {
        if (item.kind !== "file") return files;
        const file = item.getAsFile();

        if (file == null) return files;

        if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
          return files;
        }

        files.push(file);

        return files;
      }, [] as File[])
    );
  };

  const deleteImage = (previewId: string) => {
    setImagePreviews((images) =>
      images.filter((image) => image.previewID !== previewId)
    );
  };

  const submit = () => {
    if (imagePreviews.some((image) => image.isLoading)) {
      return;
    }

    // ここに送信の処理を書く
    // createPost({ text, images: imagePreviews });
  };

  const disabledAddImage = imagePreviews.length >= MAX_ATTACHMENT_COUNT;

  return (
    <div className="relative pt-4 px-1 w-[600px] ">
      <input
        hidden
        id="file"
        type="file"
        accept={SUPPORTED_MIME_TYPES.join(",")}
        onChange={handleInputFile}
        onPaste={handlePasteFile}
        ref={inputFileRef}
        disabled={disabledAddImage}
        multiple // 画像を複数選択できるようにする
      />

      <div
        className="bg-gray-800 p-2"
        // onDrop={handleDrop}
        // onDragOver={handleDragOver}
        // onDragLeave={handleDragLeave}
      >
        <div className="flex h-10 justify-between items-center rounded-md overflow-hidden">
          <input
            className="w-[800px] h-full"
            id="file"
            onPaste={handlePasteFile}
            placeholder="入力欄"
          />
          <label
            htmlFor="file"
            className={`flex justify-center items-center cursor-pointer hover:bg-gray- rounded-md`}
          >
            <PhotoIcon disabled={disabledAddImage} />
          </label>
        </div>
        {imagePreviews.length !== 0 && (
          <>
            <div className="flex space-x-1 overflow-x-auto py-2">
              {imagePreviews.map((image) => (
                <div key={`${image.previewID}`} className="relative h-32">
                  <div>
                    {image.isLoading ? (
                      <div className="flex justify-center items-center h-32 w-32 bg-gray-600">
                        loading...
                      </div>
                    ) : (
                      <img
                        src={image.url}
                        className="h-32 border-[1px] border-gray-600 "
                      />
                    )}
                    {image.previewID}
                  </div>
                  <div className="absolute top-1 right-1">
                    <DeleteButton
                      height={20}
                      width={20}
                      onClick={() => deleteImage(image.previewID)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <hr className="border-[1px] border-gray-500 my-1" />

        <div
          className="bg-gray-500 hover:bg-gray-600 rounded-sm w-10 text-center cursor-pointer"
          onClick={submit}
        >
          送信
        </div>
      </div>
    </div>
  );
};
