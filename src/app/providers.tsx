'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { base: '{colors.gray.50}', _dark: '{colors.gray.900}' } },
          card: { value: { base: '{colors.white}', _dark: '{colors.gray.800}' } },
          header: { value: { base: '{colors.gray.900}', _dark: '{colors.gray.950}' } },
        },
        text: {
          DEFAULT: { value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' } },
          secondary: { value: { base: '{colors.gray.500}', _dark: '{colors.gray.400}' } },
        },
        border: {
          DEFAULT: { value: { base: '{colors.gray.200}', _dark: '{colors.gray.700}' } },
        },
        accent: {
          DEFAULT: { value: '{colors.green.500}' },
          hover: { value: '{colors.green.600}' },
          light: { value: { base: '{colors.green.50}', _dark: '{colors.green.900}' } },
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </SessionProvider>
  )
}
