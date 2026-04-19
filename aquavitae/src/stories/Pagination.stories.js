import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Base Components/Pagination',
  component: Pagination,
  argTypes: {
    currentPage:  { control: { type: 'number', min: 1 } },
    totalPages:   { control: { type: 'number', min: 1 } },
    totalItems:   { control: 'number' },
    itemsPerPage: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
};

const Template = (args) => {
  const [page, setPage] = useState(args.currentPage ?? 1);
  return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
};

export const Default = Template.bind({});
Default.storyName = 'Página 1 de 125';
Default.args = { currentPage: 1, totalPages: 125, totalItems: 1248, itemsPerPage: 10 };

export const MiddlePage = Template.bind({});
MiddlePage.storyName = 'Página central';
MiddlePage.args = { currentPage: 60, totalPages: 125, totalItems: 1248, itemsPerPage: 10 };

export const LastPage = Template.bind({});
LastPage.storyName = 'Última página';
LastPage.args = { currentPage: 125, totalPages: 125, totalItems: 1248, itemsPerPage: 10 };

export const FewPages = Template.bind({});
FewPages.storyName = 'Pocas páginas';
FewPages.args = { currentPage: 1, totalPages: 5, totalItems: 42, itemsPerPage: 10 };
