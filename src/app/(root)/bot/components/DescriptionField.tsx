import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { formValues } from './BotForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    form:UseFormReturn<formValues,any,undefined>
    isPending:boolean
}

const DescriptionField = ({form,isPending}: Props) => {
  return (
    <FormField
      disabled={isPending}
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel className='text-md font-semibold'>Bot Description</FormLabel>
          <FormControl>
            <Textarea rows={5} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DescriptionField