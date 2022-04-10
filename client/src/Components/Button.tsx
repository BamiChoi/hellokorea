interface ButtonProps {
  text: string;
  customClassName?: string;
  errors?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
function Button({ onClick, text, customClassName, errors }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={
          customClassName
            ? customClassName
            : "bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md"
        }
      >
        {text}
      </button>
      <span className="text-warning font-semibold">{errors}</span>
    </>
  );
}

export default Button;
