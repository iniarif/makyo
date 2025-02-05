import React, { useRef, useCallback } from "react";
import ReactDOM from "react-dom"; // Import untuk portal support
import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown, HiX } from "react-icons/hi";
import useOnClickOutside from "./hooks/useOnClickOutside";

const Dropdown = ({ options = [], multiple = false, withSearch = true, customRender, onChange, portal = false, className = "", label = "Label", outlined = false, optionLabel = "label" }) => {
  const { selected, setSelected, query, setQuery, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  const containerRef = useRef(null);

  useOnClickOutside(containerRef, () => setOpen(false));

  const selectedItems = multiple ? selected || [] : selected;

  const removeItem = useCallback(
    (e, itemValue) => {
      e.stopPropagation();
      if (multiple) {
        const newSelected = selectedItems.filter((s) => s.value !== itemValue);
        setSelected(newSelected);
      }
    },
    [multiple, selectedItems, setSelected]
  );

  const clearSelection = useCallback(
    (e) => {
      e.stopPropagation();
      setSelected(multiple ? [] : null);
    },
    [multiple, setSelected]
  );

  const handleSelect = useCallback(
    (value) => {
      if (multiple) {
        setSelected(value);
      } else {
        setSelected(value);
        setOpen(false);
      }
    },
    [multiple, setSelected, setOpen]
  );
  const optionsToDisplay = options;

  const dropdownOptionsElement = (
    <div ref={floating} style={portal ? { ...style, position: "absolute", zIndex: 1500 } : { ...style, position: "static" }} className="w-full bg-white border border-gray-200 rounded-sm shadow-lg">
      <Combobox.Options static>
        {optionsToDisplay.map((option) => {
          const isSelected = multiple ? selectedItems.some((item) => item.value === option.value) : selectedItems?.value === option.value;
          return <DropdownOption key={option.value} option={option} query={query} customRender={customRender} isSelected={isSelected} optionLabel={optionLabel} />;
        })}
      </Combobox.Options>
    </div>
  );

  return (
    <div className={classNames("w-full", className)} ref={containerRef}>
      <Combobox value={selected} onChange={handleSelect} multiple={multiple}>
        {/* Label */}
        <div className="flex items-center">
          <label className="w-1/4 text-xs font-medium text-gray-700">{label}</label>

          {/* Combobox Trigger / Input */}
          <div className="w-3/4" ref={reference}>
            <div
              className={classNames(
                "flex items-center w-full p-1 py-2 rounded-sm cursor-pointer transition-colors",
                outlined ? "border border-gray-300 bg-white hover:border-gray-400" : "border border-gray-200 bg-gray-300 hover:border-gray-300"
              )}
              onClick={() => setOpen(!open)}
            >
              <div className="flex flex-wrap gap-1">
                {/* Tampilkan item yang terpilih */}
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
              <HiOutlineChevronDown className="w-4 h-4 ml-auto text-gray-500" />
            </div>
          </div>
        </div>

        {/* Dropdown list */}
        {open && (
          <>
            {withSearch && (
              <div className="flex mt-1">
                <div className="w-1/4" />
                <div className="relative w-3/4">
                  <div className="relative">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="" className="w-full py-2 pl-6 pr-6 text-xs border border-gray-200 focus:outline-none focus:border-gray-300" />
                    <div className="absolute inset-y-0 flex items-center pointer-events-none left-2">
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
                      </svg>
                    </div>
                    {query && (
                      <button onClick={() => setQuery("")} className="absolute flex items-center justify-center w-3 h-3 text-white transform -translate-y-1/2 bg-gray-400 rounded-full top-1/2 right-2 hover:bg-gray-500">
                        <HiX className="w-2 h-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {portal ? (
              // Jika portal = true, render dropdown options ke document.body
              ReactDOM.createPortal(dropdownOptionsElement, document.body)
            ) : (
              // Jika portal = false, render dropdown options secara inline (dengan grid layout)
              <div className="flex">
                <div className="w-1/4" />
                <div className="w-3/4">{dropdownOptionsElement}</div>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
};

export default Dropdown;
