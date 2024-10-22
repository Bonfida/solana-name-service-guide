import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const ReadOnlyInput = (props: InputProps) => (
  <div>
    <label className="pl-3 capitalize">{props.label}</label>
    <input
      className="bg-op h-10 w-full truncate rounded-full p-4 text-black outline-none"
      disabled={!props.value}
      readOnly
      {...props}
    />
  </div>
);
