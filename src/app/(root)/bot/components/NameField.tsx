import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import React from 'react'
import { UseFormReturn } from 'react-hook-form';
import { formValues } from './BotForm';
import { Input } from '@/components/ui/input';

type Props = {
    form:UseFormReturn<formValues,any,undefined>
    isPending:boolean
}

const NameField = ({form,isPending}: Props) => {
  return (
    <FormField
      disabled={isPending}
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-semibold">Bot Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default NameField