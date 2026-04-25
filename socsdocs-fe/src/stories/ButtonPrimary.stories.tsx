import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/ButtonPrimary';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black', padding: '2rem', minHeight: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Level1: Story = {
  args: {
    text: 'Dopamine Level 1',
  },
  parameters: {
    dopamineLevel: 1,
  },
};

export const Level2: Story = {
  args: {
    text: 'Dopamine Level 2',
  },
  parameters: {
    dopamineLevel: 2,
  },
};

export const Level3: Story = {
  args: {
    text: 'Dopamine Level 3',
  },
  parameters: {
    dopamineLevel: 3,
  },
};

export const Level4: Story = {
  args: {
    text: 'Dopamine Level 4',
  },
  parameters: {
    dopamineLevel: 4,
  },
};

export const Level5: Story = {
  args: {
    text: 'Dopamine Level 5',
  },
  parameters: {
    dopamineLevel: 5,
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a button with very long text to see how it looks',
  },
};
