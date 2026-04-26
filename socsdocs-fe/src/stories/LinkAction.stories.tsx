import type { Meta, StoryObj } from '@storybook/react';
import { LinkAction } from '../components/ui/LinkAction';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof LinkAction> = {
  title: 'UI/LinkAction',
  component: LinkAction,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AsButton: Story = {
  args: {
    children: 'Click Me (Button)',
    onClick: () => alert('Clicked!'),
    intensity: 1,
  },
};

export const AsLink: Story = {
  args: {
    children: 'Go to Home (Link)',
    to: '/',
    intensity: 1,
  },
};
