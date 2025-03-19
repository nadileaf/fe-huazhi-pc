import { type Control } from 'react-hook-form';

export type FormInput = Record<string, any>;

export interface InfoProps {
  control: Control<FormInput>;
  className?: string;
}
