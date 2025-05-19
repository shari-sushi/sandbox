export interface DeleteButtonProps {
  onClick: () => void;
  height?: number;
  width?: number;
}

export const DeleteButton = ({
  onClick,
  height = 24,
  width = 24,
}: DeleteButtonProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <div
      className={`h-fit w-fit justify-start items-center cursor-pointer rounded-md bg-white hover:bg-gray-300`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        height={height}
        width={width}
        className="fill-red-500"
      >
        <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
      </svg>
    </div>
  );
};

// plus photo
{
  /* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg> */
}
