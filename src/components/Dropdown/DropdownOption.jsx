import { Combobox } from "@headlessui/react";
import classNames from "classnames";

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="px-1 bg-blue-200 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const DropdownOption = ({ option, customRender, query }) => (
  <Combobox.Option value={option} className={({ active }) => classNames("cursor-pointer select-none px-3 py-2 text-sm", active ? "bg-blue-100 text-blue-900" : "text-gray-700")}>
    {({ selected }) => (
      <div className="flex items-center gap-2">
        {customRender ? customRender(option) : highlightMatch(option.label, query)}
        {selected && <span className="text-xs text-blue-600">✔</span>}
      </div>
    )}
  </Combobox.Option>
);

export default DropdownOption;
