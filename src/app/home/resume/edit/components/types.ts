import { type Control } from 'react-hook-form';

export interface FormInput {
  standardFields: ResumeModel.StandardFields;
}

export interface InfoProps {
  control: Control<FormInput>;
  className?: string;
}
