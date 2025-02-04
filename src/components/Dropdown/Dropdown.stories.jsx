import Dropdown from "../Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option with icon", value: "2" },
  { label: "Long Long Option 3", value: "3" },
  { label: "Long Long Long Option 4", value: "4" },
  // dan seterusnya...
];

export const Default = () => <Dropdown options={options} />;

export const MultipleSelection = () => <Dropdown multiple options={options} />;

export const Searchable = () => <Dropdown searchable options={options} />;

export const CustomRender = () => (
  <Dropdown
    options={options}
    customRender={(option) => (
      <span className="flex items-center gap-1">
        {/* Contoh highlight kata “Long” dengan background hijau */}
        {option.label.split(/(Long)/gi).map((part, idx) =>
          part.toLowerCase() === "long" ? (
            <span key={idx} className="px-1 bg-green-200 rounded">
              {part}
            </span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </span>
    )}
  />
);
