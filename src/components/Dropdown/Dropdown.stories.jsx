import Dropdown from "../Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    id: {
      control: "text",
      defaultValue: "sdd-1",
    },
    withSearch: {
      control: "boolean",
      defaultValue: true,
    },
    multiple: {
      control: "boolean",
      defaultValue: false,
    },
    outlined: {
      control: "boolean",
      defaultValue: false,
    },
    optionLabel: {
      control: "text",
      defaultValue: "label",
    },
    onChange: {
      action: "changed",
    },
    options: {
      control: "object",
      defaultValue: [
        { label: "Option 1", value: "1" },
        { label: "Option with icon", value: "2" },
        { label: "Long Long Option 3", value: "3" },
        { label: "Long Long Long Option 4", value: "4" },
      ],
    },
  },
};

// ✅ Default Story (CSF3)
export const Default = {
  args: {
    id: "sdd-1",
    withSearch: true,
    multiple: false,
    outlined: false,
    optionLabel: "label",
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
    ],
  },
};

// ✅ Multiple Selection
export const MultipleSelection = {
  args:{
    id:"sdd-2",
    withSearch:true,
    multiple:false,
    options:[
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
    ],
  },
};

// ✅ Searchable Dropdown
export const Searchable = {
  args: {
    id: "sdd-3",
    withSearch: true,
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
    ],
  },
};

// ✅ Custom Render untuk Highlight Kata "Long"
export const CustomRender = {
  args: {
    id: "sdd-4",
    withSearch: true,
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option with icon", value: "2" },
      { label: "Long Long Option 3", value: "3" },
      { label: "Long Long Long Option 4", value: "4" },
    ],
    customRender: (option) => (
      <span className="flex items-center gap-1">
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
    ),
  },
};
