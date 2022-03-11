interface ButtonProps {
  text: string;
  errors: string | undefined;
}

function Button({ text, errors }: ButtonProps) {
  return (
    <div className="w-full">
      <button className="bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md">
        {text}
      </button>
      <span className="text-warning font-semibold">{errors}</span>
    </div>
  );
}

export default Button;
