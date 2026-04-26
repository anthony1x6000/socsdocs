import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div className="w-64 h-32 flex items-center justify-center">Card Content</div>,
    intensity: 1,
  },
};

export const HighIntensity: Story = {
  args: {
    children: <div className="w-64 h-32 flex items-center justify-center">Crazy Card</div>,
    intensity: 5,
  },
};
