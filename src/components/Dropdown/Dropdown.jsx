import { useState, useRef, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { useFloating, offset } from "@floating-ui/react";
import classNames from "classnames";

const Dropdown = ({ options = [], multiple = false, searchable = true, customRender, onChange, portal = false }) => {
  const [selected, setSelected] = useState(multiple ? [] : null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { floating, reference, strategy, x, y } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4)],
  });

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filteredOptions = query ? options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase())) : options;

  const handleSelection = (option) => {
    if (multiple) {
      setSelected((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
    } else {
      setSelected(option);
      setOpen(false);
    }
    onChange && onChange(selected);
  };

  return (
    <div className="relative w-64">
      <Combobox value={selected} onChange={handleSelection} multiple={multiple}>
        <div className="relative">
          <Combobox.Button ref={reference} onClick={() => setOpen(!open)} className="w-full border p-2 rounded-lg cursor-pointer bg-white">
            {multiple ? (selected.length > 0 ? selected.map((s) => s.label).join(", ") : "Select options") : selected?.label || "Select option"}
          </Combobox.Button>
          {open && (
            <div ref={floating} style={{ position: strategy, top: y ?? 0, left: x ?? 0 }} className={classNames("absolute bg-white border rounded-lg shadow-lg max-h-60 overflow-auto z-[1050]", portal ? "fixed w-64" : "w-full")}>
              {searchable && <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-2 border-b outline-none" placeholder="Search..." />}
              <div>
                {filteredOptions.map((option) => (
                  <Combobox.Option key={option.value} value={option} className={({ active }) => `p-2 cursor-pointer ${active ? "bg-blue-500 text-white" : ""}`}>
                    {customRender ? customRender(option) : option.label}
                  </Combobox.Option>
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
