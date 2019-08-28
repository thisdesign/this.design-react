import { useRef } from 'react'

export default function useSaved(input) {
  const saved = useRef(input)
  if (input) saved.current = input
  return saved.current
}
