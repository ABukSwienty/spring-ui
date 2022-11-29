import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useCallback, useState } from "react";

import { Pagination } from "../../../library";

export default {
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  const handlePageChange = useCallback(
    (page: number) => setCurrentPage(page),
    []
  );

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  currentPage: 1,
  totalPages: 50,
  color: "light",
  take: 3,
  previousLabel: "Previous",
  nextLabel: "Next",
  icons: true,
};

export const Ellipsis = Template.bind({});

Ellipsis.args = {
  ...Default.args,
  showEllipsis: true,
};

export const Take = Template.bind({});

Take.args = {
  ...Default.args,
  take: 8,
};

export const Label = Template.bind({});

Label.args = {
  ...Default.args,
  previousLabel: "Go forward",
  nextLabel: "Go back",
};

export const NoIcon = Template.bind({});

NoIcon.args = {
  ...Default.args,
  icons: false,
};
