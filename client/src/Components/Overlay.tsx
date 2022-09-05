interface IOverlayProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

function Overlay({ onClick }: IOverlayProps) {
  return (
    <div
      onClick={onClick}
      className="w-full h-full fixed top-0 left-0 bg-black z-40 opacity-50 "
    ></div>
  );
}

export default Overlay;
