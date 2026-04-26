import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    intensity: 1,
  },
};

export const HighIntensity: Story = {
  args: {
    placeholder: 'High intensity!',
    intensity: 5,
  },
};

export const HoverEffect: Story = {
  args: {
    placeholder: 'Hover me!',
    intensity: 1,
    intensityOnHover: 4,
  },
};
