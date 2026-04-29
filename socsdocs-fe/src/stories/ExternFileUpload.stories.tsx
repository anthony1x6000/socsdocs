import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternFileUpload } from '../components/ExternFileUpload';

const meta: Meta<typeof ExternFileUpload> = {
  title: 'Components/ExternFileUpload',
  component: ExternFileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-black min-h-[400px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
