import React from 'react'
import { motion } from 'framer-motion'
import tabsConfig from '@/tabs-config.ts'
import { MessageSquareQuote, X } from 'lucide-react'
import animationConfig from '@/animation-config.ts'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx'
import useFeedbackStore from '@/feedback/store.ts'

interface ITimerContentProps {
  closeTab: () => void
}

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Invalid email address',
    })
    .optional()
    .or(z.literal('')),
  feedback: z
    .string({
      required_error: 'Feedback is required',
    })
    .min(5, {
      message: 'Feedback must be at least 5 characters',
    })
    .max(300, {
      message: 'Feedback must not be longer than 300 characters',
    }),
})

const FeedbackContent = React.forwardRef<HTMLDivElement, ITimerContentProps>(
  (props, ref) => {
    const { isSending, sendFeedback } = useFeedbackStore((state) => state)

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: '',
        feedback: '',
      },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      const success = await sendFeedback({
        email: data.email || '',
        feedback: data.feedback,
      })
      if (success) {
        form.reset()
      }
    }

    return (
      <motion.div
        ref={ref}
        className='fixed overflow-auto scrollbar-hide top-4 left-4 right-4 md:w-[500px] md:max-w-full max-h-[800px] glassmorphism z-10 p-4'
        layoutId={tabsConfig.tabIds.feedback}
        {...animationConfig.contentEnter}
      >
        <motion.div className='flex justify-between items-center mb-8'>
          <motion.div className='flex flex-row justify-center items-center'>
            <MessageSquareQuote className='cursor-pointer mr-2' size={28} />
            <motion.p className='font-bold text-xl'>Feedback</motion.p>
          </motion.div>
          <X className='cursor-pointer' size={28} onClick={props.closeTab} />
        </motion.div>
        <motion.div className='flex flex-col justify-start items-start md:p-4 p-2'>
          <motion.p className='text-md font-bold mb-2'>
            We appreciate you being here!
          </motion.p>
          <motion.p className='mb-4'>
            Got feedback or a feature request? Let us know and help us improve!
          </motion.p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col w-full'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className='rounded-2xl focus-visible:ring-transparent bg-white/70'
                        placeholder='Email (optional)'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='feedback'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className='mt-4 rounded-2xl focus-visible:ring-transparent bg-white/70 resize-none'
                        placeholder='Type your feedback here'
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='self-end mt-4'
                disabled={isSending}
              >
                Submit
              </Button>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    )
  },
)

export default FeedbackContent
