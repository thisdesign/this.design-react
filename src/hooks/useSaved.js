import { useRef } from 'react'

export default function useSaved(input) {
  const saved = useRef(input)
  return input || saved.current
}
