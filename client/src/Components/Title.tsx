import { Link } from "react-router-dom";

interface TitleProps {
  text: string;
  link?: string;
}

function Title({ text, link }: TitleProps) {
  return (
    <Link to={link ? `/${link}` : ""}>
      <h1 className="text-main mb-5 text-3xl">{text}</h1>
    </Link>
  );
}

export default Title;
