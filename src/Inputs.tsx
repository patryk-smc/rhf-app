import {
  TextField as PolarisTextField,
  Checkbox as PolarisCheckbox,
  ChoiceList as PolarisChoiceList,
  Select as PolarisSelect,
  TextFieldProps,
  CheckboxProps,
  SelectProps,
  ChoiceListProps,
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

export function Select<T>(
  props: Omit<SelectProps, "onChange"> & UseControllerProps<T>
) {
  const { field, fieldState } = useController(props);

  return (
    <PolarisSelect
      {...field}
      {...props}
      onChange={(value) => field.onChange(value)}
      error={fieldState.invalid}
    />
  );
}

export function SingleChoiceList<T>(
  props: Omit<ChoiceListProps, "selected"> & UseControllerProps<T>
) {
  const { field, fieldState } = useController(props);

  const value = field.value as string;

  return (
    <PolarisChoiceList
      allowMultiple={false}
      onChange={(value) => field.onChange(value[0])}
      selected={[value]}
      {...props}
    />
  );
}
