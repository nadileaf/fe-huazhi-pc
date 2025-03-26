import { Controller, type Control } from 'react-hook-form';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { SectionLayout } from './SectionLayout';

interface ArrayFieldProps<T> {
  name: string;
  control: Control<any>;
  title: string;
  addButtonText?: string;
  defaultValue: T;
  children: (index: number) => React.ReactNode;
  className?: string;
}

export function ArrayField<T>({
  name,
  control,
  title,
  addButtonText = '添加',
  defaultValue,
  children,
  className,
}: ArrayFieldProps<T>) {
  return (
    <SectionLayout title={title} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const items = field.value || [];
          return (
            <div className="space-y-8">
              {items.map((item: T, index: number) => (
                <div
                  key={`${index}-${Date.now()}`}
                  className="relative space-y-4 rounded-lg border bg-white p-12 px-14"
                >
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="absolute right-4 top-4"
                    onPress={() => {
                      const newValue = [...items];
                      newValue.splice(index, 1);
                      field.onChange(newValue);
                    }}
                  >
                    <Icon icon="iconamoon:trash" className="text-lg text-black-666" />
                  </Button>
                  {children(index)}
                </div>
              ))}

              <Button
                color="default"
                variant="ghost"
                className="w-full"
                size="lg"
                startContent={<Icon icon="material-symbols:add" />}
                onPress={() => {
                  field.onChange([
                    ...items,
                    {
                      ...defaultValue,
                    },
                  ]);
                }}
              >
                {addButtonText}
              </Button>
            </div>
          );
        }}
      />
    </SectionLayout>
  );
}
