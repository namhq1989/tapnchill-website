import { create } from 'zustand'
import {
  IFeedbackFormData,
  IFeedbackStore,
  ISendFeedbackApiResponse,
} from '@/feedback/types.ts'
import useHttpStore from '@/http/store.ts'
import useNotificationStore from '@/notification/store.ts'

const useFeedbackStore = create<IFeedbackStore>((set) => ({
  isSending: false,
  sendFeedback: async (data: IFeedbackFormData) => {
    set({ isSending: true })
    const { post } = useHttpStore.getState()
    const response = await post<ISendFeedbackApiResponse>('api/feedback', data)
    set({ isSending: false })
    if (response && response.ok) {
      const { showNotification } = useNotificationStore.getState()
      showNotification({
        description: 'Your feedback has been sent! Thank you for your input!',
        duration: 10000,
      })
      return true
    }
    return false
  },
}))

export default useFeedbackStore
