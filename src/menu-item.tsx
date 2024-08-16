import { IMenu } from '@/menu.ts'

const MenuItem = (item: IMenu) => {
  return (
    <div
      className='flex flex-col items-center p-4 rounded-lg cursor-pointer hover:bg-green hover:shadow-lg hover:ring-1 hover:ring-black/5'
      onClick={item.onClick}
    >
      <div className='mb-2'>
        <item.icon size={28} />
      </div>
      <p className='text-sm text-gray-600'>{item.text}</p>
    </div>
  )
}

export default MenuItem
