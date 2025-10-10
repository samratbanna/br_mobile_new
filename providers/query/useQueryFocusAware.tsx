import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { NotifyOnChangeProps, useQuery } from '@tanstack/react-query'

export function useQueryFocusAware(notifyOnChangeProps?: NotifyOnChangeProps) {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  return () => focusedRef.current

//   useQuery({
//     queryKey: ['key'],
//     queryFn: () => fetch(...),
//     enabled: () => focusedRef.current,
//   })
}