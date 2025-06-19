export const TailwindOpacity = () => {
  // https://zenn.dev/portalkeyinc/articles/b0fe3e3c195ed1 の動作チェック
  return (
    <div>
      <div className="relative w-64 h-64">
        <img src="https://storage.googleapis.com/zenn-user-upload/avatar/36cbd3e131.jpeg" />
        <div className="absolute p-2 inset-0">
          <div className="w-full h-full p-1 flex flex-col gap-2 justify-center items-center bg-gray-200 opacity-50 rounded">
            <div className="text-white text-lg font-bold text-center whitespace-pre-line cursor-default">{"PortalKey\nあぁPortalKey\nPortalKey"}</div>
            <div className="px-4 py-1 text-white text-lg font-bold bg-lightgreen-500 hover:brightness-110 rounded-full cursor-pointer">Click here!</div>
          </div>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <img src="https://storage.googleapis.com/zenn-user-upload/avatar/36cbd3e131.jpeg" />
        <div className="absolute p-2 inset-0">
          <div className="w-full h-full p-1 bg-gray-200 opacity-50 rounded">
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center opacity-100">
              <div className="text-white text-lg font-bold text-center whitespace-pre-line cursor-default">{"PortalKey\nあぁPortalKey\nPortalKey"}</div>
              <div className="px-4 py-1 text-white text-lg font-bold bg-lightgreen-500 hover:brightness-110 rounded-full cursor-pointer">Click here!</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <img src="https://storage.googleapis.com/zenn-user-upload/avatar/36cbd3e131.jpeg" />
        <div className="absolute p-2 inset-0">
          <div className="w-full h-full p-1 flex flex-col gap-2 justify-center items-center bg-gray-200 bg-opacity-50 rounded">
            <div className="text-white text-lg font-bold text-center whitespace-pre-line cursor-default">{"PortalKey\nあぁPortalKey\nPortalKey"}</div>
            <div className="px-4 py-1 text-white text-lg font-bold bg-lightgreen-500 hover:brightness-110 rounded-full cursor-pointer">Click here!</div>
          </div>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <img src="https://storage.googleapis.com/zenn-user-upload/avatar/36cbd3e131.jpeg" />
        <div className="absolute p-2 inset-0">
          <div className="relative w-full h-full rounded overflow-hidden">
            <div className="w-full h-full bg-gray-200 opacity-50" />
            <div className="absolute inset-0 p-1 flex flex-col gap-2 justify-center items-center ">
              <div className="text-white text-lg font-bold text-center whitespace-pre-line cursor-default">{"PortalKey\nあぁPortalKey\nPortalKey"}</div>
              <div className="px-4 py-1 text-white text-lg font-bold bg-lightgreen-500 hover:brightness-110 rounded-full cursor-pointer">Click here!</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <img src="https://storage.googleapis.com/zenn-user-upload/avatar/36cbd3e131.jpeg" />
        <div className="absolute p-2 inset-0">
          <div className="relative w-full h-full p-1 rounded overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gray-200 before:opacity-50">
            <div className="absolute inset-0 flex flex-col gap-2 justify-center items-center">
              <div className="text-white text-lg font-bold text-center whitespace-pre-line cursor-default">{"PortalKey\nあぁPortalKey\nPortalKey"}</div>
              <div className="px-4 py-1 text-white text-lg font-bold bg-lightgreen-500 hover:brightness-110 rounded-full cursor-pointer">Click here!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
