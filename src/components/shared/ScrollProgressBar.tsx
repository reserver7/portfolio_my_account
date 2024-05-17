import { useEffect, useRef, useState } from 'react'

import React from 'react'
import { Colors, colors } from '../../styles/colorPalette'

function ScrollProgressBar({ color = 'blue980' }: { color?: Colors }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }

    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left',
        backgroundColor: colors[color],
        height: 8,
        position: 'sticky',
        top: '64px',
        zIndex: 2,
      }}
    ></div>
  )
}

export default ScrollProgressBar
