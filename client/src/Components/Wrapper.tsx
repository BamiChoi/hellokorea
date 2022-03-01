interface LayoutProps {
  children: React.ReactNode;
}

function Wrapper({ children }: LayoutProps) {
  return (
    <div className="w-full flex justify-center items-center pb-20 pt-28">
      {children}
    </div>
  );
}

export default Wrapper;
