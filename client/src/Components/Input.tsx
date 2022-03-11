import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string | React.ReactNode;
  id: string;
  type: "text" | "file" | "birthdate" | "password";
  register: UseFormRegisterReturn;
  required: boolean;
  errors: string | undefined;
}

function Input({ label, id, type, register, required, errors }: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id}>{label}</label>
      <input
        {...register}
        type={type}
        id={id}
        required={required}
        className="px-2 py-1 rounded-md"
      />
      <span className="text-warning font-semibold">{errors}</span>
    </div>
  );
}

export default Input;
