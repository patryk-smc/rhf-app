import {
  TextField as PolarisTextField,
  Checkbox as PolarisCheckbox,
  TextFieldProps,
  CheckboxProps,
} from "@shopify/polaris";
import { useController, UseControllerProps } from "react-hook-form";

export function TextField<T>(
  props: Omit<TextFieldProps, "onChange"> & UseControllerProps<T>
) {
  const { field, fieldState } = useController(props);

  return (
    <PolarisTextField
      {...field}
      {...props}
      value={field.value}
      onChange={(value) => field.onChange(value)}
      error={fieldState.invalid}
    />
  );
}

export function Checkbox<T>(props: CheckboxProps & UseControllerProps<T>) {
  const { field, fieldState } = useController(props);

  return (
    <PolarisCheckbox
      checked={field.value}
      error={fieldState.invalid}
      {...field}
      {...props}
    />
  );
}
