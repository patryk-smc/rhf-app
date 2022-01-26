import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import en from "@shopify/polaris/locales/en.json";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";

function App() {
  return (
    <AppProvider i18n={en}>
      <FormPage1 />
      <FormPage2 />
    </AppProvider>
  );
}

export default App;
