import Dropdown from "../Dropdown";

export default {
  title: "Components/Form",
  component: Dropdown,
  argTypes: {
    id: { control: "text", defaultValue: "sdd-1" },
    withSearch: { control: "boolean", defaultValue: true },
    multiple: { control: "boolean", defaultValue: false },
    outlined: { control: "boolean", defaultValue: false },
    optionLabel: { control: "text", defaultValue: "label" },
    onChange: { action: "changed" },
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
    customRender: { control: "boolean", defaultValue: false },
  },
};

export const SelectDropdownField = {
  args:{
    id:"sdd-1",
    withSearch:false,
    multiple:false,
    outlined:false,
    optionLabel:"label",
    options:[
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
      { label: "Long Long Long Long Option 5", value: "5" },
      { label: "Long Long Long Long Long Option 6", value: "6" },
    ],
    customRender:false,
  },
};
