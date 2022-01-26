import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import en from "@shopify/polaris/locales/en.json";
import FormPage from "./FormPage";

function App() {
  return (
    <AppProvider i18n={en}>
      <FormPage />
    </AppProvider>
  );
}

export default App;
