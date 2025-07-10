// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://bihtxqjgdzwqtesytzip.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpaHR4cWpnZHp3cXRlc3l0emlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTAzNTAsImV4cCI6MjA2NzYyNjM1MH0.Ben1qcSXGjQ3ZcKKcCGMzfKydVaV7NP9MC_NqeAp-Gw',
  {
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
)
