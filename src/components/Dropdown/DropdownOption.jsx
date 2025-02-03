import { Combobox } from "@headlessui/react";
import classNames from "classnames";

const DropdownOption = ({ option, customRender }) => (
  <Combobox.Option value={option} className={({ active }) => classNames("p-2 cursor-pointer", active && "bg-blue-500 text-white")}>
    {customRender ? customRender(option) : option.label}
  </Combobox.Option>
);

export default DropdownOption;
