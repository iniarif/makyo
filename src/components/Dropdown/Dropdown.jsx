import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown } from "react-icons/hi";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false, className = "", label = "Label", outlined = false }) => {
  const { selected, setSelected, query, setQuery, filteredOptions, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  // Pastikan selected tidak null
  const selectedItems = multiple ? selected || [] : selected;

  // Hapus salah satu item (untuk multiple = true)
  const removeItem = (e, itemValue) => {
    e.stopPropagation();
    const newSelected = selectedItems.filter((s) => s.value !== itemValue);
    setSelected(newSelected);
  };

  // Hapus semua item (untuk single selection)
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected(multiple ? [] : null);
  };

  // Handle pilihan dropdown
  const handleSelect = (value) => {
    if (multiple) {
      setSelected([...selectedItems, value]);
    } else {
      setSelected(value);
      setOpen(false); // ✅ Menutup dropdown setelah memilih opsi
    }
  };

  return (
    <div className={classNames("w-full", className)}>
      <div className="flex items-center gap-4">
        <label className="w-1/4 text-sm font-medium text-gray-700">{label}</label>
        <div className="relative w-3/4">
          <Combobox value={selected} onChange={handleSelect} multiple={multiple}>
            <div className={classNames("relative flex items-center w-full p-2 bg-white border rounded-md cursor-pointer", outlined ? "border-2" : "")} ref={reference} onClick={() => setOpen(!open)}>
              <div className="flex flex-wrap items-center flex-1 gap-1">
                {multiple &&
                  selectedItems.length > 0 &&
                  selectedItems.map((s) => (
                    <div key={s.value} className="flex items-center px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full">
                      <span className="mr-1">{s.label}</span>
                      <button className="text-gray-600 hover:text-gray-900" onClick={(e) => removeItem(e, s.value)}>
                        ✕
                      </button>
                    </div>
                  ))}

                {!multiple && selectedItems && (
                  <div className="flex items-center px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full">
                    <span className="mr-1">{selectedItems.label}</span>
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
                  placeholder={multiple ? (selectedItems.length === 0 ? "Select options..." : "") : selectedItems ? "" : "Select option..."}
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
                    filteredOptions.map((option) => (
                      <DropdownOption
                        key={option.value}
                        option={option}
                        customRender={customRender}
                        query={query}
                        onClick={() => handleSelect(option)} // ✅ Memilih opsi menutup dropdown
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </Combobox>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
