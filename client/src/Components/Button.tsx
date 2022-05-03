interface ButtonProps {
  text: string;
  customClassName?: string;
  errors?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function Button({ text, customClassName, onClick, errors }: ButtonProps) {
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
      {errors ? (
        <span className="text-warning font-semibold">{errors}</span>
      ) : null}
    </>
  );
}

export default Button;
