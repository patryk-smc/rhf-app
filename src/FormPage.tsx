import {
  Page,
  Card,
  Form,
  FormLayout,
  RadioButton,
  Stack,
} from "@shopify/polaris";
import { Checkbox, Select, SingleChoiceList, TextField } from "./Inputs";
import { useForm } from "react-hook-form";
import RenderCount from "./RenderCount";

export default function Page2() {
  type FormData = {
    name: string;
    accounts: "disabled" | "enabled";
    check: boolean;
    sel: string;
    choice: string;
  };

  const defaultValues: FormData = {
    name: "Jaded Pixel",
    accounts: "disabled",
    check: true,
    sel: "b",
    choice: "x",
  };

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues,
  const renders = useRenders()

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

            <Checkbox<FormData>
              control={control}
              label="Basic checkbox"
              name="check"
            />

            <Select<FormData>
              control={control}
              label="Select label"
              name="sel"
              options={[
                { label: "A", value: "a" },
                { label: "B", value: "b" },
              ]}
            />

            <SingleChoiceList<FormData>
              control={control}
              name="choice"
              title="Choices"
              choices={[
                { label: "A", value: "a" },
                { label: "B", value: "b" },
              ]}
            />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
