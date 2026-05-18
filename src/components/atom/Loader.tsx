import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className='animate-spin' />
      {children && <span className="text-sm">{children}</span>}
    </div>
  )
}

export default Loader