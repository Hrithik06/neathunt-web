import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

type PlatformFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function PlatformField({
  value,
  onChange,
  options,
}: PlatformFieldProps) {
  const [open, setOpen] = useState(false);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <input
          className="nh-input"
          placeholder="LinkedIn"
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          className="
            w-[var(--radix-popover-trigger-width)]
            rounded-xl
            border
            shadow-lg
            overflow-hidden
            z-50
          "
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((platform) => (
              <button
                key={platform}
                type="button"
                className="
                  w-full text-left px-3 py-2
                  hover:bg-black/5
                "
                onClick={() => {
                  onChange(platform);
                  setOpen(false);
                }}
              >
                {platform}
              </button>
            ))
          ) : (
            <div
              className="px-3 py-2 text-sm"
              style={{
                color: "var(--muted)",
              }}
            >
              Press Enter to create "{value}"
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
