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
import type { UseControllerProps, FieldValues, FieldPath, RegisterOptions } from 'react-hook-form'
// INFO: useController wants it's own type-safe `name` passed + returns `field.name` to spread into the input
// INFO: Might need additional props omitted if matters _(i.e. onChange, onBlur etc.)_
// as useController passes it's on callbacks. Passed input props might re-write the field handlers
type ControllerProps = 'name' | 'onBlur' | 'onChange' | 'value' | 'pattern'

type OmitDuplicateInputProps<InputProps> = Omit<InputProps, ControllerProps>

export const TextField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  onBlur,
  onChange,
  validate,
  pattern,
  ...props
}: OmitDuplicateInputProps<PolarisTextFieldProps> &
  Omit<UseControllerProps<TFieldValues, TName>, 'rules'> &
  // INFO: event type of `onChange` & `onBlur` is `any` in RHF. Might be worth looking into providing your own `event` types here
  Pick<RegisterOptions<TFieldValues, TName>, 'onBlur' | 'onChange' | 'validate' | 'pattern'>) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController({
    ...props,
    rules: {
      ...props,
      onBlur,
      onChange,
    },
  })

  return (
    <PolarisTextField
      {...fieldProps}
      {...props}
      pattern={pattern?.toString()}
      error={fieldState.error?.message}
    />
  )
}

export const Checkbox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  onBlur,
  onChange,
  validate,
  ...props
}: OmitDuplicateInputProps<PolarisCheckboxProps> &
  UseControllerProps<TFieldValues, TName> &
  // INFO: Controller rules types aren't very extensible atm, so we need to `Pick` from the `RegisterOptions` instead
  Pick<RegisterOptions<TFieldValues, TName>, 'onBlur' | 'onChange' | 'validate'>) => {
  const {
    field: { ref, value, ...fieldProps },
    fieldState,
  } = useController({
    ...props,
    rules: {
      onBlur,
      onChange,
      validate,
    },
  })

  return (
    <PolarisCheckbox checked={value} {...fieldProps} {...props} error={fieldState.error?.message} />
  )
}

export const Select = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  onChange,
  onBlur,
  validate,
  ...props
}: OmitDuplicateInputProps<PolarisSelectProps> &
  UseControllerProps<TFieldValues, TName> &
  Pick<RegisterOptions<TFieldValues, TName>, 'onBlur' | 'onChange' | 'validate'>) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController({
    ...props,
    rules: {
      onChange,
      onBlur,
      validate,
    },
  })

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
  onChange,
  onBlur,
  validate,
  ...props
}: PolarisStackProps & {
  // INFO: might want to add a title prop for the Radio Group
  options: RadioButtonProps[]
} & UseControllerProps<TFieldValues, TName> &
  Pick<RegisterOptions<TFieldValues, TName>, 'onBlur' | 'onChange' | 'validate'>) => {
  const {
    field: { ref, onChange: _onChange, value, ...fieldProps },
  } = useController({
    ...props,
    rules: {
      onChange,
      onBlur,
      validate,
    },
  })

  return (
    <Stack {...props}>
      {options.map(({ id, ...option }) => (
        <PolarisRadioButton
          {...option}
          {...fieldProps}
          onChange={(value, id) => _onChange(id)}
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
  {
    onChange,
    onBlur,
    validate,
    ...props
  }: Omit<OmitDuplicateInputProps<PolarisChoiceListProps>, 'selected' | 'allowMultiple'> &
    UseControllerProps<TFieldValues, TName> &
    Pick<RegisterOptions<TFieldValues, TName>, 'onBlur' | 'onChange' | 'validate'>
) => {
  const {
    field: { ref, value, onChange: _onChange, ...fieldProps },
    fieldState,
  } = useController({
    ...props,
    rules: {
      onChange,
      onBlur,
      validate,
    },
  })

  return (
    <PolarisChoiceList
      {...fieldProps}
      {...props}
      allowMultiple={false}
      selected={[value]}
      onChange={value => _onChange(value[0])}
      error={fieldState.error?.message}
    />
  )
}
