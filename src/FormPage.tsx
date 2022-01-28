import { useEffect } from 'react'
import {
  Button,
  Card,
  ContextualSaveBar,
  Form,
  FormLayout,
  Page,
  PageActions,
} from '@shopify/polaris'
import type {
  DefaultValues,
  SubmitHandler,
  Control,
  UseFormSetValue,
  UseFormReset,
  UseFormHandleSubmit,
  SubmitErrorHandler,
} from 'react-hook-form'
import { useForm, useWatch, useFormState } from 'react-hook-form'
import { Checkbox, RadioGroup, Select, SingleChoiceList, TextField } from './Inputs'
import useRenders from './useRenders'

interface FormValuesPreviewProps {
  control: Control<FormValues>
}

const FormValuesPreview = ({ control }: FormValuesPreviewProps) => {
  const formValues = useWatch({ control })

  return (
    <Card title='Form Values Preview (For Demo purposes)' sectioned>
      <pre>
        <code>{JSON.stringify(formValues, null, 2)}</code>
      </pre>
    </Card>
  )
}

interface SubmitButtonProps {
  control: Control<FormValues>
}
// INFO: to avoid subscribing the whole form to the formState changes (prevent rerenders)
const SubmitButton = ({ control }: SubmitButtonProps) => {
  const { isSubmitting } = useFormState({ control })

  return (
    <Button submit primary loading={isSubmitting}>
      Save product
    </Button>
  )
}

interface FormActionsProps {
  control: Control<FormValues>
  reset: UseFormReset<FormValues>
  submit: () => Promise<void>
}
// INFO: to avoid subscribing the whole form to the formState changes (prevent rerenders)
const FormActions = ({ control, submit, reset }: FormActionsProps) => {
  const { isSubmitting, isDirty } = useFormState({ control })

  return (
    <>
      {isDirty && (
        <ContextualSaveBar
          message={'Unsaved changes'}
          saveAction={{
            content: 'Save',
            onAction: submit,
            loading: isSubmitting,
            disabled: false,
          }}
          discardAction={{
            onAction: reset,
            content: 'Discard',
          }}
        />
      )}
      <PageActions
        secondaryActions={[
          {
            content: 'Discard',
            disabled: !isDirty,
            onAction: reset,
          },
        ]}
        primaryAction={{
          content: 'Save',
          disabled: !isDirty,
          loading: isSubmitting,
          onAction: submit,
        }}
      />
    </>
  )
}

interface CheckboxInputProps {
  control: Control<FormValues>
  setValue: UseFormSetValue<FormValues>
}

const CheckboxInput = ({ control, setValue }: CheckboxInputProps) => {
  const sel = useWatch({ control, name: 'sel' })

  useEffect(() => {
    if (sel === 'a') {
      setValue('check', false)
    }
  }, [sel, setValue])

  return (
    <Checkbox
      control={control}
      label='Basic checkbox'
      name='check'
      // INFO: by subscribing to sel value change, we can toggle the state of this input
      disabled={sel === 'a'}
    />
  )
}

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
]

const radioOptions = [
  {
    label: 'Accounts are disabled',
    helpText: 'Customers will only be able to check out as guests.',
    id: 'disabled',
  },
  {
    label: 'Accounts are enabled',
    helpText: 'Customers will be able to check out with a customer account only.',
    id: 'enabled',
  },
  {
    label: 'Accounts are optional',
    id: 'optional',
    disabled: true,
  },
]

type Option = 'a' | 'b'
type RadioOption = 'disabled' | 'enabled'

interface FormValues {
  name: string
  accounts: RadioOption
  check: boolean
  sel: Option
  choice: Option
  radio: RadioOption
  price: string
  weight: string
}

const defaultValues: DefaultValues<FormValues> = {
  name: 'Jaded Pixel',
  accounts: 'disabled',
  check: true,
  sel: 'b',
  choice: 'a',
  radio: 'disabled',
  price: '11.99',
  weight: '1.5',
}

const Page2 = () => {
  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues,
  })
  const sel = watch('sel')
  // INFO: you can simply use root-level watch to create side-effects on value change
  // it will cause a re-render of the whole form. Depending on the form / value / anything else
  // you might wanna localize the re-render into it's own component and use `useWatch` there
  // But in this form, I'd say, it would be over-optimizing, so I'd simply do it here
  useEffect(() => {
    if (sel === 'a') {
      setValue('check', false)
    }
  }, [sel, setValue])

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Send to API', data)
    alert(JSON.stringify(data, null, 2))
    // INFO: can close the form modal here or some other business logic here
  }

  const onError: SubmitErrorHandler<FormValues> = errors => {
    console.log('Handle errors', errors)
  }

  const submit = handleSubmit(onSubmit, onError)

  const renders = useRenders()

  return (
    <Page title={`Form with React Hook Form (Renders: ${renders})`}>
      <Card sectioned>
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              minLength={10}
              control={control}
              name='name'
              label='Store Name'
              autoComplete='name'
            />
            <TextField
              minLength={10}
              control={control}
              name='price'
              label='Price'
              onBlur={event => {
                // INFO: Might be worth proving a `format` callback inside the TextField instead
                // and exposing it. Idk what would suite the use-case.
                // INFO: format your value here
                const formattedValue = event.target.value
                setValue('price', `${formattedValue} formatted`)
              }}
              type='currency'
              inputMode='decimal'
              autoComplete='off'
            />
            <TextField
              min={10}
              control={control}
              name='weight'
              label='Weight (kgs)'
              onBlur={event => {
                // INFO: format your value here
                const formattedValue = event.target.value
                setValue('weight', formattedValue)
              }}
              type='number'
              inputMode='decimal'
              helpText='Up to two decimal places'
              autoComplete='off'
            />
            {/* INFO: alternative way to watch for `sel` value and disable the check input with it's value set to false */}
            {/* <CheckboxInput control={control} setValue={setValue} /> */}
            <Checkbox
              control={control}
              label='Basic checkbox'
              name='check'
              // INFO: by subscribing to sel value change, we can toggle the state of this input
              disabled={sel === 'a'}
            />
            <Select control={control} label='Select label' name='sel' options={options} />
            <SingleChoiceList control={control} name='choice' title='Choices' choices={options} />
            <RadioGroup vertical control={control} name='radio' options={radioOptions} />
            <SubmitButton control={control} />
          </FormLayout>
        </Form>
      </Card>
      <FormActions control={control} reset={reset} submit={submit} />
      <FormValuesPreview control={control} />
    </Page>
  )
}

export default Page2
