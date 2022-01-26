import {
  Page,
  Card,
  Form,
  FormLayout,
  TextField,
  RadioButton,
  Stack,
  Checkbox,
} from "@shopify/polaris";
import { Checkbox as CheckboxRHF, TextField as TextFieldRHF } from "./Inputs";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import RenderCount from "./RenderCount";

export default function Page1() {
  const [value, setValue] = useState("Jaded Pixel");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const [value2, setValue2] = useState("disabled");

  const handleChange2 = useCallback(
    (_checked, newValue) => setValue2(newValue),
    []
  );

  const [checked, setChecked] = useState(false);
  const handleChange3 = useCallback((newChecked) => setChecked(newChecked), []);

  const onSubmit = (data: any) => {};

  return (
    <Page title={"Form with React Hooks"}>
      <Card sectioned>
        <Form onSubmit={onSubmit}>
          <RenderCount />
          <FormLayout>
            <TextField
              label="Store name"
              value={value}
              onChange={handleChange}
              autoComplete="off"
            />
            <Stack vertical>
              <RadioButton
                label="Accounts are disabled"
                helpText="Customers will only be able to check out as guests."
                checked={value2 === "disabled"}
                id="disabled"
                name="accounts"
                onChange={handleChange2}
              />
              <RadioButton
                label="Accounts are optional"
                helpText="Customers will be able to check out with a customer account or as a guest."
                id="optional"
                name="accounts"
                checked={value2 === "optional"}
                onChange={handleChange2}
              />
            </Stack>
            <Checkbox
              label="Basic checkbox"
              checked={checked}
              onChange={handleChange3}
            />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}

function Page2({ title }: { title: string }) {
  type FormData = {
    name: string;
    accounts: boolean;
    check: boolean;
  };

  const defaultValues: FormData = {
    name: "Jaded Pixel",
    accounts: false,
    check: false,
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
  };

  return (
    <Page title={title}>
      <Card sectioned>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout>
            <TextFieldRHF<FormData>
              control={control}
              name="name"
              label="Store name"
              // value={value}
              // onChange={handleChange}
              autoComplete="off"
            />
            <Stack vertical>
              <RadioButton
                label="Accounts are disabled"
                helpText="Customers will only be able to check out as guests."
                // checked={value2 === false}
                // id="disabled"
                name="accounts"
                // onChange={handleChange2}
              />
              <RadioButton
                label="Accounts are optional"
                helpText="Customers will be able to check out with a customer account or as a guest."
                // id="optional"
                name="accounts"
                // checked={value2 === true}
                // onChange={handleChange2}
              />
            </Stack>

            <CheckboxRHF<FormData>
              control={control}
              label="Basic checkbox"
              name="check"
              // checked={checked}
              // onChange={handleChange3}
            />

            <pre>{JSON.stringify(fields, null, 2)}</pre>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
