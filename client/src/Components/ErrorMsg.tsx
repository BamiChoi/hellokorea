interface IErrorMsgProps {
  text: string;
}

function ErrorMsg({ text }: IErrorMsgProps) {
  return <div className="flex p-10 justify-center items-center">{text}</div>;
}

export default ErrorMsg;
