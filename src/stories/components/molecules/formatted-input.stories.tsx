import {
  CreditCardIcon,
  DocumentTextIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FormattedInput } from "../../../library";

export default {
  component: FormattedInput,
} as ComponentMeta<typeof FormattedInput>;

const Template: ComponentStory<typeof FormattedInput> = (args) => (
  <FormattedInput {...args} />
);

export const CreditCard = Template.bind({});

CreditCard.args = {
  color: "brand",
  leadingIcon: CreditCardIcon,
  format: "creditCard",
};

export const ToLocaleString = Template.bind({});

ToLocaleString.args = {
  color: "brand",
  leadingIcon: HashtagIcon,
  format: "toLocaleString",
};

export const ToUpperCase = Template.bind({});

ToUpperCase.args = {
  color: "brand",
  leadingIcon: DocumentTextIcon,
  format: "toUpperCase",
};
