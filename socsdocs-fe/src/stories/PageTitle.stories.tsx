import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Default: Story = {};

export const Level1: Story = {
  parameters: { dopamineLevel: 1 },
};

export const Level2: Story = {
  parameters: { dopamineLevel: 2 },
};

export const Level3: Story = {
  parameters: { dopamineLevel: 3 },
};

export const Level4: Story = {
  parameters: { dopamineLevel: 4 },
};

export const Level5: Story = {
  parameters: { dopamineLevel: 5 },
};
