interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <h1 className="text-main mb-5 text-3xl">{text}</h1>;
}

export default Title;
