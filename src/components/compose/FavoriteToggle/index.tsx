import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'

interface TFavoriteToggle {
  isFavorited: boolean,
  isLoading: boolean,
  disabled?: boolean,
  onClick: (e?: any) => void,
}

const FavoriteToggle = ({
  isFavorited,
  isLoading = false,
  onClick,
  disabled = false,
}: TFavoriteToggle) => {
  return (
    <Button disabled={disabled} className='flex items-center justify-center' variant="ghost" onClick={onClick}>
      <HeartIcon className={cn('h-5 w-5 fill-muted text-foreground/40 transition-colors',
        isFavorited && 'fill-red-400 text-red-400',
        isLoading && 'animate-pulse'
      )} />
    </Button>
  )
}

export default FavoriteToggle