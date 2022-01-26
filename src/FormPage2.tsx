import {
  Page,
  Card,
  Form,
  FormLayout,
  RadioButton,
  Stack,
} from "@shopify/polaris";
import { Checkbox, TextField } from "./Inputs";
import { useForm } from "react-hook-form";
import RenderCount from "./RenderCount";

export default function Page2() {
  type FormData = {
    name: string;
    accounts: "disabled" | "enabled";
    check: boolean;
  };

  const defaultValues: FormData = {
    name: "Jaded Pixel",
    accounts: "disabled",
    check: true,
  };

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues,
  });

  const fields = watch();

  const onSubmit = (data: FormData) => {
    console.log("Send to API", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Page title={"Form with React Hook Form"}>
      <Card sectioned>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RenderCount />
          <FormLayout>
            <TextField<FormData>
              control={control}
              name="name"
              label="Store name"
              autoComplete="off"
            />
            <Stack vertical>
              <RadioButton
                label="Accounts are disabled"
                helpText="Customers will only be able to check out as guests."
                name="accounts"
              />
              <RadioButton
                label="Accounts are optional"
                helpText="Customers will be able to check out with a customer account or as a guest."
                name="accounts"
              />
            </Stack>

            <Checkbox<FormData>
              control={control}
              label="Basic checkbox"
              name="check"
            />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
