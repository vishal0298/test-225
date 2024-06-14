import React, { useState } from "react";
import { EyeOffIcon, EyeOnIcon } from "assets/icons";
import {
  type UseFormRegister,
  type FieldValues,
  type RegisterOptions,
  type Path,
} from "react-hook-form";

export interface FormInputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<TFormValues>;
  isInvalid: boolean;
  type: string;
  label: string;
  errorMessage?: string;
  inputProps?: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>;
}

export const Input = <TFormValues extends FieldValues>({
  isInvalid,
  label,
  name,
  rules,
  errorMessage,
  type,
  register,
  inputProps,
}: FormInputProps<TFormValues>) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <label className="block text-black-800 text-base font-medium mb-3">
        {label}
      </label>
      <div className="relative mb-2">
        <input
          {...register(name, rules)}
          type={isShow ? "text" : type}
          className="w-full border border-cyan-800/50 px-4 py-3 rounded focus:outline-0"
          {...inputProps}
        />

        {type === "password" && (
          <button
            onClick={() => setIsShow(!isShow)}
            className="absolute top-3 right-3"
            type="button"
          >
            {isShow ? <EyeOnIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>

      {isInvalid && <span className="text-red-800">{errorMessage}</span>}
    </>
  );
};
