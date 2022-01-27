import {
  TextField as PolarisTextField,
  Checkbox as PolarisCheckbox,
  Select as PolarisSelect,
  ChoiceList as PolarisChoiceList,
  RadioButton as PolarisRadioButton,
  Stack,
} from '@shopify/polaris'
import type {
  TextFieldProps as PolarisTextFieldProps,
  CheckboxProps as PolarisCheckboxProps,
  SelectProps as PolarisSelectProps,
  ChoiceListProps as PolarisChoiceListProps,
  RadioButtonProps as PolarisRadioButtonProps,
  StackProps as PolarisStackProps,
} from '@shopify/polaris'
import { useController } from 'react-hook-form'
import type { UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'
// INFO: useController wants it's own type-safe `name` passed + returns `field.name` to spread into the input
// INFO: Might need additional props omitted if matters _(i.e. onChange, onBlur etc.)_
// as useController passes it's on callbacks. Passed input props might re-write the field handlers
type ControllerProps = 'name'

type OmitDuplicateInputProps<InputProps> = Omit<InputProps, ControllerProps>

export const TextField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: OmitDuplicateInputProps<PolarisTextFieldProps> & UseControllerProps<TFieldValues, TName>
) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController(props)

  return <PolarisTextField {...fieldProps} {...props} error={fieldState.error?.message} />
}

export const Checkbox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: OmitDuplicateInputProps<PolarisCheckboxProps> & UseControllerProps<TFieldValues, TName>
) => {
  const {
    field: { ref, value, ...fieldProps },
    fieldState,
  } = useController(props)

  return (
    <PolarisCheckbox checked={value} {...fieldProps} {...props} error={fieldState.error?.message} />
  )
}

export const Select = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
  props: OmitDuplicateInputProps<PolarisSelectProps> & UseControllerProps<TFieldValues, TName>
) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController(props)

  return <PolarisSelect {...fieldProps} {...props} error={fieldState.error?.message} />
}

type RadioButtonProps = Omit<
  PolarisRadioButtonProps,
  'checked' | 'name' | 'value' | 'onChange' | 'onFocus' | 'onBlur'
>

export const RadioGroup = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  options,
  ...props
}: PolarisStackProps & {
  // INFO: might want to add a title prop for the Radio Group
  options: RadioButtonProps[]
} & UseControllerProps<TFieldValues, TName>) => {
  const {
    field: { ref, onChange, value, ...fieldProps },
  } = useController(props)

  return (
    <Stack {...props}>
      {options.map(({ id, ...option }) => (
        <PolarisRadioButton
          {...option}
          {...fieldProps}
          onChange={(value, id) => onChange(id)}
          id={id}
          checked={value === id}
        />
      ))}
    </Stack>
  )
}

export const SingleChoiceList = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  // INFO: omit `selected` since useController takes care of the `selected` value
  // INFO: omit `allowMultiple` since the input is defined as a **single** choice list
  props: Omit<OmitDuplicateInputProps<PolarisChoiceListProps>, 'selected' | 'allowMultiple'> &
    UseControllerProps<TFieldValues, TName>
) => {
  const {
    field: { ref, value, onChange, ...fieldProps },
    fieldState,
  } = useController(props)

  return (
    <PolarisChoiceList
      {...fieldProps}
      {...props}
      allowMultiple={false}
      selected={[value]}
      onChange={value => onChange(value[0])}
      error={fieldState.error?.message}
    />
  )
}
