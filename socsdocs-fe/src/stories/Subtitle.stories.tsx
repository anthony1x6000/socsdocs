import type { Meta, StoryObj } from '@storybook/react-vite';
import Subtitle from '../components/ui/Subtitle';

const meta: Meta<typeof Subtitle> = {
  title: 'Components/Subtitle',
  component: Subtitle,
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
type Story = StoryObj<typeof Subtitle>;

export const Level1: Story = {
  args: { text: 'Dopamine Level 1 Subtitle' },
  parameters: { dopamineLevel: 1 },
};

export const Level2: Story = {
  args: { text: 'Dopamine Level 2 Subtitle' },
  parameters: { dopamineLevel: 2 },
};

export const Level3: Story = {
  args: { text: 'Dopamine Level 3 Subtitle' },
  parameters: { dopamineLevel: 3 },
};

export const Level4: Story = {
  args: { text: 'Dopamine Level 4 Subtitle' },
  parameters: { dopamineLevel: 4 },
};

export const Level5: Story = {
  args: { text: 'Dopamine Level 5 Subtitle' },
  parameters: { dopamineLevel: 5 },
};