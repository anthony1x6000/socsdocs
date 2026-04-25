import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '../components/ui/Headers';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    text: 'Standard Header',
  },
};

export const LongText: Story = {
  args: {
    text: 'A Much Longer Header for Testing Layout',
  },
};
