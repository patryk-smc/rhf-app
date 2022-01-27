import { Button, Card, Form, FormLayout, Page } from '@shopify/polaris'
import type { DefaultValues, SubmitHandler, Control } from 'react-hook-form'
import { useForm, useWatch } from 'react-hook-form'
import { Checkbox, Select, SingleChoiceList, TextField } from './Inputs'
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

const options = [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
]

type Option = 'a' | 'b'

interface FormValues {
  name: string
  accounts: 'disabled' | 'enabled'
  check: boolean
  sel: Option
  choice: Option
}

const defaultValues: DefaultValues<FormValues> = {
  name: 'Jaded Pixel',
  accounts: 'disabled',
  check: true,
  sel: 'b',
  choice: 'a',
}

const onSubmit: SubmitHandler<FormValues> = data => {
  console.log('Send to API', data)
  alert(JSON.stringify(data, null, 2))
}

const Page2 = () => {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues,
  })
  const { isSubmitting } = formState
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
            <Checkbox control={control} label='Basic checkbox' name='check' />
            <Select control={control} label='Select label' name='sel' options={options} />
            <SingleChoiceList control={control} name='choice' title='Choices' choices={options} />
            <Button submit primary loading={isSubmitting}>
              Save product
            </Button>
          </FormLayout>
        </Form>
      </Card>
      <FormValuesPreview control={control} />
    </Page>
  )
}

export default Page2
