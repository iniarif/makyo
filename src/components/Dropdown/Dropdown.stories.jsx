import Dropdown from "../Dropdown";

export default {
  title: "Components/Form",
  component: Dropdown,
  argTypes: {
    id: { control: "text", defaultValue: "sdd-1" },
    withSearch: { control: "boolean", defaultValue: true },
    options: {
      control: "object",
      defaultValue: [
        { label: "Option 1", value: "1" },
        { label: "Option with icon", value: "2" },
        { label: "Long Long Option 3", value: "3" },
        { label: "Long Long Long Option 4", value: "4" },
        { label: "Long Long Long Long Option 5", value: "5" },
        { label: "Long Long Long Long Long Option 6", value: "6" },
      ],
    },
    multiple: { control: "boolean", defaultValue: false },
    optionLabel: { control: "text", defaultValue: "label" },
    onChange: { action: "changed" },
    outlined: { control: "boolean", defaultValue: false },
  },
};

export const SelectDropdownField = {
  args:{
    id:"sdd-1",
    withSearch:true,
    options:[
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
      { label: "Long Long Long Long Option 5", value: "5" },
      { label: "Long Long Long Long Long Option 6", value: "6" },
    ],
    multiple:false,
    optionLabel:"Label",
    outlined:true,
  },
};
