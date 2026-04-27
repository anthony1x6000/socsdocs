import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../components/ui/Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'SOCSDOCS',
  },
};

export const Header: Story = {
  args: {
    variant: 'header',
    children: 'This is a Header',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    children: 'This is a Subtitle',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'This is simple text',
  },
};
