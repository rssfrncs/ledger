import React from "react";
import { v4 as uuid } from "uuid";

type Props = {
  value: string;
  label: string;
  checked: boolean;
  onClick: (value: string) => void;
};

export function Radio({ value, checked, label, onClick }: Props) {
  const id = `${uuid()}-${value}`;
  return (
    <div style={{ flexDirection: "row", justifyContent: "center" }}>
      <div style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
        <label htmlFor={id} style={{ paddingRight: 5 }}>
          {label}
        </label>
        <input
          id={id}
          type="radio"
          checked={checked}
          onChange={() => void onClick(value)}
        />
      </div>
    </div>
  );
}
