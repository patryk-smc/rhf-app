import { Button, Card, ContextualSaveBar, Form, FormLayout, Layout, Page, PageActions } from '@shopify/polaris'
import { DefaultValues, SubmitHandler, Control, useFormState } from 'react-hook-form'
import { useForm, useWatch } from 'react-hook-form'
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
}
// INFO: to avoid subscribing the whole form to the formState changes (prevent rerenders)
const FormActions = ({ control }: FormActionsProps) => {
  const { isSubmitting } = useFormState({ control })
  const isDirty = true // placeholder
  const reset = () => {} // placeholder
  const submit = () => {} // placeholder

  return (
    <>
      {isDirty && (
        <ContextualSaveBar
          message={"Unsaved changes"}
          saveAction={{
            content: "Save",
            onAction: submit,
            loading: isSubmitting,
            disabled: false
          }}
          discardAction={{
            onAction: reset,
            content: "Discard"
          }}
        />
      )}
      <PageActions
      secondaryActions={[
        {
          content: "Discard",
          disabled: !isDirty,
          onAction: reset
        }
      ]}
      primaryAction={{
        content: "Save",
        disabled: !isDirty,
        loading: isSubmitting,
        onAction: submit
      }}
    />
  </>
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

const onSubmit: SubmitHandler<FormValues> = data => {
  console.log('Send to API', data)
  alert(JSON.stringify(data, null, 2))
}

const Page2 = () => {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues,
  })
  const renders = useRenders()

  return (
    <Page title={`Form with React Hook Form (Renders: ${renders})`}>
      <Card sectioned>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Checkbox control={control} label='Basic checkbox' name='check' />
            <Select control={control} label='Select label' name='sel' options={options} />
            <SingleChoiceList control={control} name='choice' title='Choices' choices={options} />
            <RadioGroup vertical control={control} name='radio' options={radioOptions} />
            <SubmitButton control={control} />
          </FormLayout>
        </Form>
      </Card>
      <FormActions control={control}/>
      <FormValuesPreview control={control} />
    </Page>
  )
}

export default Page2
