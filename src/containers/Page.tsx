// THIS CONTAINER IS NOT NEEDED, USE NEXT.JS BUILT-IN _app.tsx
// IT DOES THE SAME JOB EXACTLY

import React, { ReactNode } from 'react'

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen'>
      { children }
    </div>
  )
}
