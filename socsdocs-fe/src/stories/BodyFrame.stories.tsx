import type { Meta, StoryObj } from '@storybook/react';
import { BodyFrame } from '../components/ui/BodyFrame';

const meta: Meta<typeof BodyFrame> = {
  title: 'Components/BodyFrame',
  component: BodyFrame,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#222', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BodyFrame>;

export const Default: Story = {
  args: {
    children: <div className="text-white">Content inside BodyFrame</div>,
  },
};

export const CustomClass: Story = {
  args: {
    className: 'border-2 border-red-500',
    children: <div className="text-white">With custom border</div>,
  },
};
