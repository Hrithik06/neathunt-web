import CreatableSelect from "react-select/creatable";

type Option = {
  value: string;
  label: string;
};

type PlatformFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export default function PlatformField({
  options,
  value,
  onChange,
}: PlatformFieldProps) {
  return (
    <div className="nh-select-wrap">
      <CreatableSelect
        unstyled
        options={options}
        value={
          value
            ? {
                value,
                label: value,
              }
            : null
        }
        onChange={(option) => {
          onChange(option?.value ?? "");
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
        classNames={{
          control: () => "nh-input",

          menu: () => "nh-rs-menu",

          option: ({ isFocused, isSelected }) =>
            `
          nh-rs-option
          ${isFocused ? "nh-rs-option--focused" : ""}
          ${isSelected ? "nh-rs-option--selected" : ""}
          `,
        }}
      />
    </div>
    // <CreatableSelect<Option, false>
    //   isClearable
    //   options={options}
    // value={
    //   value
    //     ? {
    //         value,
    //         label: value,
    //       }
    //     : null
    // }
    // onChange={(option) => {
    //   onChange(option?.value ?? "");
    // }}
    //   // styles={customStyles}
    // />
  );
}
