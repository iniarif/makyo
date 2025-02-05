import { Combobox } from "@headlessui/react";
import classNames from "classnames";

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");

  // Bagi string sesuai 'query', dan pertahankan query di dalam array (capturing group)
  const parts = text.split(regex);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="text-white bg-green-700">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const DropdownOption = ({ option, customRender, query, optionLabel }) => {
  const labelText = option[optionLabel] || option.label;
  return (
    <Combobox.Option
      value={option}
      className={({ active, selected }) => {
        const baseClass = "cursor-pointer select-none px-2 py-2 text-xs";
        if (active && selected) {
          return classNames(baseClass, "bg-green-300 text-green-900");
        } else if (active) {
          return classNames(baseClass, "bg-green-100 text-green-900");
        } else if (selected) {
          return classNames(baseClass, "bg-green-200 text-green-900");
        }
        return classNames(baseClass, "text-gray-700");
      }}
    >
      {({ active, selected }) => <div className="flex items-center">{customRender ? customRender(option) : highlightMatch(labelText, query)}</div>}
    </Combobox.Option>
  );
};

export default DropdownOption;
