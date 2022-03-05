interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return (
    <button className="bg-main text-white hover:bg-powermain h-12 mt-4 w-full rounded-md">
      {text}
    </button>
  );
}

export default Button;
