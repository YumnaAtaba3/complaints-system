import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  passwordToggle?: boolean;
};

export const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  passwordToggle = false,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const actualType = passwordToggle && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          type={actualType}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={(e) => {
            try {
              if ((e as React.KeyboardEvent).getModifierState("CapsLock")) {
                setCapsLockOn(true);
              } else {
                setCapsLockOn(false);
              }
            } catch {
              setCapsLockOn(false);
            }
          }}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            const text = e.clipboardData.getData("text").replace(/\s/g, "");
            e.preventDefault();
            onChange(text);
          }}
          className={`h-11 ${passwordToggle ? "pr-12" : ""} 
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-0"
                : "focus:ring-1 focus:ring-primary focus:border-primary"
            }
            `}
        />

        {passwordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Eye className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>

      {/* Caps Lock Warning */}
      {passwordToggle && capsLockOn && (
        <p className="text-xs text-yellow-500">Caps Lock is ON</p>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
