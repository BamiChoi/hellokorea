import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  customClassName?: string;
  errors?: string | undefined;
  url?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function Button({ text, customClassName, url, onClick, errors }: ButtonProps) {
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
        <Link to={url ? url : ""}>{text}</Link>
      </button>
      {errors ? (
        <span className="text-warning font-semibold">{errors}</span>
      ) : null}
    </>
  );
}

export default Button;
