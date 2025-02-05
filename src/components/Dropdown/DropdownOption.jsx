import { Combobox } from "@headlessui/react";
import classNames from "classnames";

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="px-0.5 bg-green-700 text-white rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const DropdownOption = ({ option, customRender, query }) => (
  <Combobox.Option value={option} className={({ active }) => classNames("cursor-pointer select-none px-2 py-1 text-xs", active ? "bg-green-100 text-green-900" : "text-gray-700")}>
    {() => <div className="flex items-center gap-1">{customRender ? customRender(option) : highlightMatch(option.label, query)}</div>}
  </Combobox.Option>
);

export default DropdownOption;
