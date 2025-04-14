import { Stack } from 'expo-router'
import React from 'react'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#000000" } }}>
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='signup'options={{ headerShown: false }} />
    </Stack>
  )
}