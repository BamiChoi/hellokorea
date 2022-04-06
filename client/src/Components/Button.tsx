interface ButtonProps {
  text: string;
  customCls?: string;
  errors?: string | undefined;
  onClick?: React.MouseEvent<HTMLElement>;
}

function Button({ onClick, text, customCls, errors }: ButtonProps) {
  return (
    <div className="w-full">
      <button
        className={
          customCls
            ? customCls
            : "bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md"
        }
      >
        {text}
      </button>
      <span className="text-warning font-semibold">{errors}</span>
    </div>
  );
}

export default Button;
