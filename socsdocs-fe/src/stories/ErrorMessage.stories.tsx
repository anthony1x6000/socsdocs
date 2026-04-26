import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Something went wrong!',
  },
};
