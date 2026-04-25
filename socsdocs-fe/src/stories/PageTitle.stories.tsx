import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '../components/ui/Title';

const meta: Meta<typeof PageTitle> = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text displayed inside the heading',
    },
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Override store level for preview',
    },
  },
  args: {
    text: 'Dopamine Title',
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
type Story = StoryObj<typeof PageTitle>;

export const Level1: Story = { args: { level: 1 } };
export const Level2: Story = { args: { level: 2 } };
export const Level3: Story = { args: { level: 3 } };
export const Level4: Story = { args: { level: 4 } };
export const Level5: Story = { args: { level: 5 } };
