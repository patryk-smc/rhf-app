import { AppProvider, Frame } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import en from "@shopify/polaris/locales/en.json";
import FormPage from "./FormPage";

function App() {
  return (
    <AppProvider i18n={en}>
      <Frame>
        <FormPage />
      </Frame>
    </AppProvider>
  );
}

export default App;
