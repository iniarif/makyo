import Dropdown from "../Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const Default = () => <Dropdown options={options} />;
export const MultipleSelection = () => <Dropdown options={options} multiple />;
export const Searchable = () => <Dropdown options={options} searchable />;
export const CustomRender = () => <Dropdown options={options} customRender={(option) => <span className="text-red-500">{option.label}</span>} />;
