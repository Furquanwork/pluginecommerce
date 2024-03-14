import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
} from "@shopify/polaris";
import { ExternalIcon } from "@shopify/polaris-icons";
import { navigate } from "raviger";
import Spyfu from "./Spyfu";

const HomePage = () => {
  return (
    <>
      <div>
         <Spyfu />
      </div>
    </>
  );
};

export default HomePage;
