import React from "react";
import { Story, Meta } from "@storybook/react";

import Icon, { ICartProps } from ".";

export default {
  title: "Icon/Cart",
  subcomponents: { Cart: Icon.Cart },
} as Meta;

const Template: Story<ICartProps> = (args) => <Icon.Cart {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  size: "51px",
  color: "red",
};
