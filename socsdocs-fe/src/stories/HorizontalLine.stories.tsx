import type { Meta, StoryObj } from '@storybook/react-vite';
import HorizontalLine from '../components/ui/HorizontalLine';

const meta: Meta<typeof HorizontalLine> = {
  title: 'Components/HorizontalLine',
  component: HorizontalLine,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'black', padding: '2rem', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HorizontalLine>;

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