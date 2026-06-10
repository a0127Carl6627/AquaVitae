// Instancia global de QueryClient para TanStack Query.

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Datos se consideran frescos 1 minuto; después se refetcha en background
      staleTime:        60 * 1000,
      // Cache se mantiene 5 minutos al desmontar el componente
      gcTime:           5 * 60 * 1000,
      // Reintentar solo 1 vez 
      retry:            1,
      // Refetchar al volver al tab
      refetchOnWindowFocus: true,
    },
  },
});