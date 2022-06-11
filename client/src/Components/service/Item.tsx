import { ReactElement } from "react";

interface IItemProps {
  text: string;
  icon: ReactElement;
}

function Item({ text, icon }: IItemProps) {
  return (
    <div className="bg-main cursor-pointer text-white text-xl hover:text-white hover:border-powermain rounded-md flex justify-center items-center aspect-square p-8 w-full hover:bg-powermain flex-col">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default Item;
