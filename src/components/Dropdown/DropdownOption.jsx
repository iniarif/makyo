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
  <Combobox.Option
    value={option}
    // Headless UI akan memanggil fungsi di bawah dg { active, selected, ... }
    className={({ active, selected }) => {
      // Kelas dasar
      const baseClass = "cursor-pointer select-none px-2 py-1 text-xs";

      if (active && selected) {
        // Kondisi jika keduanya true (sedang di-hover & terpilih)
        return classNames(baseClass, "bg-green-300 text-green-900");
      } else if (active) {
        // Saat di-hover saja
        return classNames(baseClass, "bg-green-100 text-green-900");
      } else if (selected) {
        // Saat opsi sedang terpilih (tidak di-hover)
        return classNames(baseClass, "bg-green-200 text-green-900");
      }
      // Default
      return classNames(baseClass, "text-gray-700");
    }}
  >
    {({ active, selected }) => <div className="flex items-center gap-1">{customRender ? customRender(option) : highlightMatch(option.label, query)}</div>}
  </Combobox.Option>
);

export default DropdownOption;
