import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexBox } from '../components/ui/FlexBox';

const meta: Meta<typeof FlexBox> = {
  title: 'Components/FlexBox',
  component: FlexBox,
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
type Story = StoryObj<typeof FlexBox>;

const defaultArgs = {
  className: 'gap-4 p-4 bg-gray-800 text-white rounded',
  children: (
    <>
      <div className="p-2 bg-gray-700">Item 1</div>
      <div className="p-2 bg-gray-700">Item 2</div>
      <div className="p-2 bg-gray-700">Item 3</div>
    </>
  ),
};

export const Level1: Story = {
  args: defaultArgs,
  parameters: { dopamineLevel: 1 },
};

export const Level2: Story = {
  args: defaultArgs,
  parameters: { dopamineLevel: 2 },
};

export const Level3: Story = {
  args: defaultArgs,
  parameters: { dopamineLevel: 3 },
};

export const Level4: Story = {
  args: defaultArgs,
  parameters: { dopamineLevel: 4 },
};

export const Level5: Story = {
  args: defaultArgs,
  parameters: { dopamineLevel: 5 },
};