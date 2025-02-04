import { Combobox } from "@headlessui/react";
import { useDropdown } from "./hooks/useDropdown";
import DropdownOption from "./DropdownOption";
import classNames from "classnames";
import { HiOutlineChevronDown } from "react-icons/hi"; // Contoh pakai react-icons

const Dropdown = ({
  options = [],
  multiple = false,
  searchable = true,
  customRender,
  onChange,
  portal = false,
  className = "",
  label = "Label", // tambahkan prop label
}) => {
  const { selected, setSelected, query, setQuery, filteredOptions, open, setOpen, floating, reference, style } = useDropdown({ options, multiple, onChange });

  // Fungsi untuk menghapus salah satu item (untuk multiple = true)
  const removeItem = (e, itemValue) => {
    e.stopPropagation();
    const newSelected = selected.filter((s) => s.value !== itemValue);
    setSelected(newSelected);
  };

  // Fungsi untuk menghapus item pada single selection
  const clearSelection = (e) => {
    e.stopPropagation();
    setSelected(multiple ? [] : null);
  };

  return (
    <div className={classNames("relative", className)}>
      {/* Bagian label */}
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>

      <Combobox
        value={selected}
        onChange={setSelected}
        multiple={multiple}
        // Supaya klik di luar Combobox juga bisa menutup
        // (opsional jika ingin menambahkan fitur ini):
        // onBlur={() => setOpen(false)}
      >
        <div className={classNames("flex items-center justify-between w-full border rounded-md p-2 bg-white cursor-pointer")} ref={reference} onClick={() => setOpen(!open)}>
          {/* Bagian “tag” terpilih */}
          <div className="flex flex-wrap items-center gap-1">
            {multiple ? (
              // Jika multiple = true
              selected.length > 0 ? (
                selected.map((s) => (
                  <div key={s.value} className="flex items-center px-2 py-1 text-sm bg-gray-200 rounded-full">
                    <span className="mr-1">{s.label}</span>
                    <button className="text-gray-600 hover:text-gray-800" onClick={(e) => removeItem(e, s.value)}>
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-gray-400">Select options...</span>
              )
            ) : (
              // Jika multiple = false
              <>
                {selected ? (
                  <div className="flex items-center px-2 py-1 text-sm bg-gray-200 rounded-full">
                    <span className="mr-1">{selected.label}</span>
                    <button className="text-gray-600 hover:text-gray-800" onClick={clearSelection}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">Select option...</span>
                )}
              </>
            )}
          </div>

          {/* Ikon panah di sebelah kanan */}
          <HiOutlineChevronDown className={classNames("text-gray-500 transition-transform", open ? "rotate-180" : "")} />
        </div>

        {open && (
          <div ref={floating} style={style} className="absolute z-[1050] w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
            {/* Input pencarian di dalam dropdown */}
            {searchable && (
              <div className="p-2 border-b">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-1 border border-gray-300 rounded outline-none" placeholder="Search..." />
              </div>
            )}

            {/* Daftar opsi */}
            <div className="py-1">
              {filteredOptions.length === 0 ? <div className="p-2 text-sm text-gray-500">Tidak ada data.</div> : filteredOptions.map((option) => <DropdownOption key={option.value} option={option} customRender={customRender} />)}
            </div>
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default Dropdown;
