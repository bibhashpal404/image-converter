import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { type SupportedOutputFormat } from "@shared/schema";

interface FormatSelectorProps {
  value: SupportedOutputFormat;
  onChange: (format: SupportedOutputFormat) => void;
  formats: SupportedOutputFormat[];
  disabled?: boolean;
}

export function FormatSelector({ value, onChange, formats, disabled }: FormatSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={val => onChange(val as SupportedOutputFormat)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select output format" />
      </SelectTrigger>
      <SelectContent>
        {formats.map(format => (
          <SelectItem key={format} value={format}>
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}