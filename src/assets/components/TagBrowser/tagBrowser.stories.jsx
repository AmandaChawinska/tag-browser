import React from "react";
// import { Story, Meta } from '@storybook/react';
import TagBrowser from "./tagBrowser";

export default {
  title: "TagBrowser",
  component: TagBrowser,
};

const Template = (args) => <TagBrowser {...args} />;

export const Default = Template.bind({});
Default.args = {};
