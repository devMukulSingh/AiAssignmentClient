import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { formValues } from './BotForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    form:UseFormReturn<formValues,any,undefined>
    isPending:boolean
}

const AboutField = ({form,isPending}: Props) => {
  return (
    <FormField
      disabled={isPending}
      name="about"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md font-semibold">About Bot</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default AboutField