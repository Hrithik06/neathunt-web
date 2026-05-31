import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format, parseISO } from "date-fns";
import "./DatePickerField.css";
type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function DatePickerField({ value, onChange }: Props) {
  const selected = value ? parseISO(value) : undefined;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className="nh-input nh-date-trigger">
          {selected ? format(selected, "dd MMM yyyy") : "Select date"}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content sideOffset={6} className="nh-date-popover">
          <DayPicker
            mode="single"
            selected={selected}
            endMonth={new Date()}
            onSelect={(date) => {
              if (!date) return;
              onChange(format(date, "yyyy-MM-dd"));
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
