import React from "react";
import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown, HiOutlineSearch, HiX } from "react-icons/hi";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false, className = "", label = "Label", outlined = false }) => {
  const {
    selected,
    setSelected,
    query,
    setQuery,
    // Meskipun useDropdown menghasilkan filteredOptions, kita tidak menggunakannya
    open,
    setOpen,
    floating,
    reference,
    style,
  } = useDropdown({ options, multiple, onChange });

  // Pastikan selected tidak null
  const selectedItems = multiple ? selected || [] : selected;

  // Fungsi untuk menghapus salah satu item (untuk multiple)
  const removeItem = (e, itemValue) => {
    e.stopPropagation();
    const newSelected = selectedItems.filter((s) => s.value !== itemValue);
    setSelected(newSelected);
  };

  // Fungsi untuk menghapus seluruh item (untuk single selection)
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected(multiple ? [] : null);
  };

  // Fungsi untuk menangani pilihan dropdown
  const handleSelect = (value) => {
    if (multiple) {
      setSelected([...selectedItems, value]);
    } else {
      setSelected(value);
      setOpen(false); // Menutup dropdown setelah memilih opsi
    }
  };

  // Selalu tampilkan seluruh opsi, tanpa filtering
  const optionsToDisplay = options;

  return (
    <div className={classNames("w-full", className)}>
      <Combobox value={selected} onChange={handleSelect} multiple={multiple}>
        {/* Baris utama: Label dan combobox utama */}
        <div className="flex items-center gap-4">
          <label className="w-1/4 text-sm font-medium text-gray-700">{label}</label>
          <div className="w-3/4" ref={reference}>
            <div className={classNames("flex items-center w-full p-2 bg-white border rounded-md cursor-pointer", outlined ? "border-2" : "")} onClick={() => setOpen(!open)}>
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
              </div>
              <HiOutlineChevronDown className={classNames("text-gray-500 transition-transform", open ? "rotate-180" : "")} />
            </div>
          </div>
        </div>

        {/* Bagian input pencarian dan dropdown list */}
        {open && (
          <div className="flex flex-col mt-2">
            {/* Baris input pencarian */}
            <div className="flex">
              {/* Kolom kosong untuk menyelaraskan dengan label */}
              <div className="w-1/4" />
              <div className="w-3/4">
                {searchable && (
                  <div className="relative">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded outline-none" />
                    <HiOutlineSearch className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
                    {query && (
                      <button onClick={() => setQuery("")} className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
                        <HiX />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Baris dropdown list (tanpa jarak dengan input pencarian) */}
            <div className="flex">
              <div className="w-1/4" />
              <div className="w-3/4">
                {optionsToDisplay.length > 0 && (
                  <div
                    ref={floating}
                    // Override posisi agar dropdown mengikuti alur dokumen
                    style={{ ...style, position: "static" }}
                    className="z-[1050] w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    <Combobox.Options static>
                      {optionsToDisplay.map((option) => (
                        <Combobox.Option key={option.value} value={option} as={React.Fragment}>
                          {({ active, selected }) => <DropdownOption option={option} customRender={customRender} query={query} active={active} selected={selected} />}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default Dropdown;
