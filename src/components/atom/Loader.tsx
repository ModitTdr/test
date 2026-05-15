import React from 'react'

const Loader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      {children && <span className="text-sm">{children}</span>}
    </div>
  )
}

export default Loader