import React from "react";

export function Input({ register, name, ...rest }: any) {
  return <input {...register(name)} {...rest} />;
}

export function Select({ register, options, name, ...rest }: any) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value: any) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
