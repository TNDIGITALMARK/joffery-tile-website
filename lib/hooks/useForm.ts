import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import * as z from 'zod';

export function useForm<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
}: {
  schema: T;
  defaultValues?: z.infer<T>;
}) {
  return useReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
} 