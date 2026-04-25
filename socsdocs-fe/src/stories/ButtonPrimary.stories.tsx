import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ButtonPrimary';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    backgroundColor: {
      control: 'inline-radio',
      options: ['black', 'white'],
      description: 'Toggles the background color of the preview',
    },
  },
  args: {
    backgroundColor: 'black',
  },
  decorators: [
    (Story, context) => (
      <div style={{ backgroundColor: context.args.backgroundColor, padding: '2rem', minHeight: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Click Me',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a button with very long text to see how it looks',
  },
};
