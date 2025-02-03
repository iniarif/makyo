import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false, className = "" }) => {
  const { selected, setSelected, query, setQuery, filteredOptions, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  return (
    <div className={classNames("relative w-64", className)}>
      <Combobox value={selected} onChange={setSelected} multiple={multiple}>
        <div className="relative">
          <Combobox.Button ref={reference} onClick={() => setOpen(!open)} className="w-full border p-2 rounded-lg cursor-pointer bg-white">
            {multiple ? (selected.length > 0 ? selected.map((s) => s.label).join(", ") : "Select options") : selected?.label || "Select option"}
          </Combobox.Button>

          {open && (
            <div ref={floating} style={style} className="absolute bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-[1050] w-full">
              {searchable && <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-2 border-b outline-none" placeholder="Search..." />}
              <div>
                {filteredOptions.map((option) => (
                  <DropdownOption key={option.value} option={option} customRender={customRender} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default Dropdown;
