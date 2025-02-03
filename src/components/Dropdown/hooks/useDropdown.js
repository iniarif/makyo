import { useState, useEffect } from "react";
import { useFloating, offset } from "@floating-ui/react";

export const useDropdown = ({ options, multiple, onChange }) => {
  const [selected, setSelected] = useState(multiple ? [] : null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = query ? options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase())) : options;

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const { floating, reference, strategy, x, y } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4)],
  });

  const style = { position: strategy, top: y ?? 0, left: x ?? 0 };

  return {
    selected,
    setSelected,
    query,
    setQuery,
    filteredOptions,
    open,
    setOpen,
    floating,
    reference,
    style,
  };
};
