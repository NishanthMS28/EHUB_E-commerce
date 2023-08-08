import Commerce from "@chec/commerce.js";
import { ThemeProvider } from "@material-ui/core";

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);

// Usually for creating a fully functional web application, you would need a full
// backend api with all the routed for fetching the products, creating them, deleting
// upadting, selling them you need authentication and a lot more things, all of that is
// stored in this commerce api.
