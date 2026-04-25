import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsBar } from '../components/ui/SettingsBar';

const meta: Meta<typeof SettingsBar> = {
  title: 'Components/SettingsBar',
  component: SettingsBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '100px', backgroundColor: '#333' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsBar>;

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
