import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown } from "react-icons/hi";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false, className = "", label = "Label" }) => {
  const { selected, setSelected, query, setQuery, filteredOptions, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  // Hapus salah satu item (untuk multiple = true)
  const removeItem = (e, itemValue) => {
    e.stopPropagation();
    const newSelected = selected.filter((s) => s.value !== itemValue);
    setSelected(newSelected);
  };

  // Hapus semua item (untuk single selection)
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected(multiple ? [] : null);
  };

  return (
    <div className={classNames("w-full", className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative w-full mt-1">
        <Combobox value={selected} onChange={setSelected} multiple={multiple}>
          <div className="relative flex items-center w-full p-2 bg-white border rounded-md cursor-pointer" ref={reference} onClick={() => setOpen(!open)}>
            {/* Tampilan input utama (selalu menampilkan input untuk pencarian) */}
            <div className="flex flex-wrap items-center flex-1 gap-1">
              {multiple &&
                selected.length > 0 &&
                selected.map((s) => (
                  <div key={s.value} className="flex items-center px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full">
                    <span className="mr-1">{s.label}</span>
                    <button className="text-gray-600 hover:text-gray-900" onClick={(e) => removeItem(e, s.value)}>
                      ✕
                    </button>
                  </div>
                ))}

              {!multiple && selected && (
                <div className="flex items-center px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full">
                  <span className="mr-1">{selected.label}</span>
                  <button className="text-gray-600 hover:text-gray-900" onClick={clearSelection}>
                    ✕
                  </button>
                </div>
              )}

              <input
                type="text"
                className="border-none outline-none flex-1 min-w-[50px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={multiple ? (selected.length === 0 ? "Select options..." : "") : selected ? "" : "Select option..."}
              />
            </div>
            <HiOutlineChevronDown className={classNames("text-gray-500 transition-transform", open ? "rotate-180" : "")} />
          </div>

          {open && (
            <div ref={floating} style={style} className="absolute z-[1050] w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
              {searchable && (
                <div className="relative p-2 border-b">
                  <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" placeholder="Search..." />
                </div>
              )}
              <div className="py-1">
                {filteredOptions.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">No options found.</div>
                ) : (
                  filteredOptions.map((option) => <DropdownOption key={option.value} option={option} customRender={customRender} query={query} />)
                )}
              </div>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default Dropdown;
