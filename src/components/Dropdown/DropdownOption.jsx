import { Combobox } from "@headlessui/react";
import classNames from "classnames";

const DropdownOption = ({ option, customRender }) => (
  <Combobox.Option value={option} className={({ active }) => classNames("cursor-pointer select-none px-3 py-2 text-sm", active ? "bg-blue-500 text-white" : "text-gray-700")}>
    {({ selected }) => (
      <div className="flex items-center gap-2">
        {/* Jika ingin menampilkan ikon tertentu dari data option, bisa diselipkan di sini */}
        {customRender ? customRender(option) : option.label}
        {selected && <span className="text-xs">✔</span>}
      </div>
    )}
  </Combobox.Option>
);

export default DropdownOption;
