import React from "react";
import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown, HiX } from "react-icons/hi";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false, className = "", label = "Label", outlined = false }) => {
  const { selected, setSelected, query, setQuery, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  // Pastikan nilai selected tidak null
  const selectedItems = multiple ? selected || [] : selected;

  // Hapus item pilihan (untuk multiple)
  const removeItem = (e, itemValue) => {
    e.stopPropagation();
    if (multiple) {
      const newSelected = selectedItems.filter((s) => s.value !== itemValue);
      setSelected(newSelected);
    }
  };

  // Hapus pilihan (untuk single/multiple)
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected(multiple ? [] : null);
  };

  // Tangani pemilihan opsi
  const handleSelect = (value) => {
    if (multiple) {
      setSelected([...selectedItems, value]);
    } else {
      setSelected(value);
      setOpen(false);
    }
  };

  // Selalu tampilkan seluruh opsi (tanpa filtering)
  const optionsToDisplay = options;

  return (
    <div className={classNames("w-full", className)}>
      <Combobox value={selected} onChange={handleSelect} multiple={multiple}>
        {/* Baris utama: Label dan Combobox */}
        <div className="flex items-center gap-4">
          <label className="w-1/4 text-xs font-medium text-gray-700">{label}</label>
          <div className="w-3/4" ref={reference}>
            <div className="flex items-center w-full p-1 border border-gray-200 rounded cursor-pointer" onClick={() => setOpen(!open)}>
              <div className="flex flex-wrap gap-1">
                {multiple ? (
                  selectedItems.length > 0 &&
                  selectedItems.map((item) => (
                    <span key={item.value} className="inline-flex items-center bg-gray-100 text-xs text-gray-700 rounded-full px-2 py-0.5">
                      {item.label}
                      <button onClick={(e) => removeItem(e, item.value)} className="flex items-center justify-center w-3 h-3 ml-1 border border-gray-700 rounded-full">
                        <HiX className="w-3 h-3 text-gray-500" />
                      </button>
                    </span>
                  ))
                ) : selectedItems ? (
                  <span className="inline-flex items-center bg-gray-100 text-xs text-gray-700 rounded-full px-2 py-0.5">
                    {selectedItems.label}
                    <button onClick={clearSelection} className="flex items-center justify-center w-3 h-3 ml-1 border border-gray-700 rounded-full">
                      <HiX className="w-3 h-3 text-gray-500" />
                    </button>
                  </span>
                ) : null}
              </div>
              <HiOutlineChevronDown className="w-3 h-3 ml-auto text-gray-500" />
            </div>
          </div>
        </div>

        {/* Input Pencarian & Dropdown List – pastikan lebarnya konsisten */}
        {open && (
          <>
            {/* Baris input pencarian */}
            <div className="flex mt-1">
              <div className="w-1/4" />
              <div className="relative w-3/4">
                {searchable && (
                  <div className="relative">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="" className="w-full py-1 pl-6 pr-6 text-xs border border-gray-200 rounded focus:outline-none focus:border-green-500" />
                    {/* Ikon pencarian di kiri */}
                    <div className="absolute inset-y-0 flex items-center pointer-events-none left-2">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
                      </svg>
                    </div>
                    {/* Tombol clear (X) di kanan */}
                    {query && (
                      <button onClick={() => setQuery("")} className="absolute flex items-center justify-center w-3 h-3 ml-1 text-white transform -translate-y-1/2 bg-gray-400 rounded-full top-1/2 right-2 hover:bg-gray-500">
                        <HiX className="w-2 h-2" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Baris dropdown list */}
            <div className="flex">
              <div className="w-1/4" />
              <div className="w-3/4">
                {optionsToDisplay.length > 0 && (
                  <div ref={floating} style={{ ...style, position: "static" }} className="w-full border border-gray-200 rounded">
                    <Combobox.Options static>
                      {optionsToDisplay.map((option) => (
                        <DropdownOption key={option.value} option={option} query={query} customRender={customRender} />
                      ))}
                    </Combobox.Options>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Combobox>
    </div>
  );
};

export default Dropdown;
