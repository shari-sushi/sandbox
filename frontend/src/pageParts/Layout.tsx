interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-lvh w-lvw p-2 bg-zinc-900 text-white select-none">
      {children}
    </div>
  );
}

export default Layout;
