import { useEffect, useState } from 'react'
import './loading-line.css'

type LoadingLineProps = {
  loading: boolean
  /** Wait this long before showing, so fast transitions don't flash. Supabase shows it immediately (0). */
  delayMs?: number
}

export const LoadingLine = ({ loading, delayMs = 0 }: LoadingLineProps) => {
  const [visible, setVisible] = useState(loading && delayMs === 0)

  useEffect(() => {
    if (!loading) return setVisible(false)
    if (delayMs === 0) return setVisible(true)
    const id = setTimeout(() => setVisible(true), delayMs)
    return () => clearTimeout(id)
  }, [loading, delayMs])

  return (
    <div
      className="loading-line"
      data-loading={visible}
      role="progressbar"
      aria-busy={visible}
      aria-hidden={!visible}
    >
      <span className="loading-line__pulse" />
    </div>
  )
}
