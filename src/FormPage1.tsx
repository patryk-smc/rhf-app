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
import { useCallback, useState } from "react";
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
                value="disabled"
                name="accounts"
                onChange={handleChange2}
              />
              <RadioButton
                label="Accounts are optional"
                helpText="Customers will be able to check out with a customer account or as a guest."
                name="accounts"
                value="optional"
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
