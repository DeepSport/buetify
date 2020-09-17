import { PropApiDescription } from "../../components/apiView";

export const ColorVariantPropApi: PropApiDescription = {
  name: "<code>variant</code>",
  description: "Variant (color) of the button",
  type: "String",
  values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
  default: "<code>is-primary</code>",
  required: "false"
};
