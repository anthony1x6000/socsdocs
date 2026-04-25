import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: Story = {
  args: {},
};
