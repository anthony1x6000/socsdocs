import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../components/ui/Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
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
type Story = StoryObj<typeof Text>;

export const Level1: Story = {
  args: { children: 'Dopamine Level 1 Text' },
  parameters: { dopamineLevel: 1 },
};

export const Level2: Story = {
  args: { children: 'Dopamine Level 2 Text' },
  parameters: { dopamineLevel: 2 },
};

export const Level3: Story = {
  args: { children: 'Dopamine Level 3 Text' },
  parameters: { dopamineLevel: 3 },
};

export const Level4: Story = {
  args: { children: 'Dopamine Level 4 Text' },
  parameters: { dopamineLevel: 4 },
};

export const Level5: Story = {
  args: { children: 'Dopamine Level 5 Text' },
  parameters: { dopamineLevel: 5 },
};