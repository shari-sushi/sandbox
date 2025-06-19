export default function Page() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = ({ id }: Props) => {
  return (
    <>
      <>{id}</>
    </>
  );
};
