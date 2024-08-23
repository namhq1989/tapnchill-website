import { AnimatePresence, motion } from 'framer-motion'
import EffectPreview from '@/effect/preview.tsx'
import tabsConfig from '@/tabs-config.ts'
import EffectContent from '@/effect/content.tsx'
import TimerPreview from '@/timer/preview.tsx'
import TimerContent from '@/timer/content.tsx'
import CalendarPreview from '@/calendar/preview.tsx'
import AudiencePreview from '@/audience/preview.tsx'
import MoodPreview from '@/mood/preview.tsx'
import MoodContent from '@/mood/content.tsx'
import useAppStore from '@/store.ts'

interface ITabsProps {
  isMenuOpened: boolean
}

const Tabs = (props: ITabsProps) => {
  const { openedTabId, setOpenedTabId } = useAppStore((state) => state)
  const isShowUI = props.isMenuOpened && !openedTabId

  return (
    <motion.div
      initial={false}
      animate={{ opacity: props.isMenuOpened ? 1 : 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className={`fixed inset-0 bg-black/20 cursor-pointer z-[1] ${openedTabId ? 'block' : 'hidden'}`}
        onClick={() => setOpenedTabId('')}
      ></motion.div>
      <motion.div
        initial={false}
        animate={{ opacity: isShowUI ? 1 : 0 }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className='grid grid-cols-6 gap-4 auto-rows-min w-[500px] max-w-full'
      >
        <MoodPreview
          tabId={tabsConfig.tabIds.mood}
          onClick={() => setOpenedTabId(tabsConfig.tabIds.mood)}
        />
        <AudiencePreview
          tabId={tabsConfig.tabIds.audience}
          onClick={() => setOpenedTabId(tabsConfig.tabIds.audience)}
        />
        <CalendarPreview
          tabId={tabsConfig.tabIds.calendar}
          onClick={() => setOpenedTabId(tabsConfig.tabIds.calendar)}
        />
        <EffectPreview
          tabId={tabsConfig.tabIds.effect}
          onClick={() => setOpenedTabId(tabsConfig.tabIds.effect)}
        />
        <TimerPreview
          tabId={tabsConfig.tabIds.timer}
          onClick={() => setOpenedTabId(tabsConfig.tabIds.timer)}
        />
      </motion.div>

      <AnimatePresence mode='popLayout'>
        {openedTabId == tabsConfig.tabIds.mood && (
          <MoodContent closeTab={() => setOpenedTabId('')} />
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {openedTabId == tabsConfig.tabIds.effect && (
          <EffectContent closeTab={() => setOpenedTabId('')} />
        )}
      </AnimatePresence>
      <AnimatePresence mode='popLayout'>
        {openedTabId == tabsConfig.tabIds.timer && (
          <TimerContent closeTab={() => setOpenedTabId('')} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Tabs
