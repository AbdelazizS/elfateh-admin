<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
// import { type Task } from '../data/schema'


import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDown, ArrowUp } from 'lucide-vue-next';
import { EyeNoneIcon } from '@radix-icons/vue';

interface DataTableColumnHeaderProps {
  column: Column<any>,
  title: string
}



defineProps<DataTableColumnHeaderProps>()



</script>



<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="-ml-3 h-8 data-[state=open]:bg-accent"
        >
          <span>{{ $t(title) }}</span>
          <ArrowDown v-if="column.getIsSorted() === 'desc'" class="w-4 h-4 ms-1" />
          <ArrowUp v-else-if=" column.getIsSorted() === 'asc'" class="w-4 h-4 ms-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" class="rtl-dir">
        <DropdownMenuItem @click="column.toggleSorting(false)">
          <ArrowUp class="me-1 h-3.5 w-3.5 text-muted-foreground/70" />
          {{ $t('Asc') }}
        </DropdownMenuItem>
        
        <DropdownMenuItem @click="column.toggleSorting(true)">
          <ArrowDown class="me-1 h-3.5 w-3.5 text-muted-foreground/70" />
  
          {{ $t('Desc') }}
        </DropdownMenuItem>

        <DropdownMenuItem @click="column.toggleVisibility(false)">
          <EyeNoneIcon class="me-1 h-3.5 w-3.5 text-muted-foreground/70" />
          

          {{ $t('Hide') }}
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  </div>


</template>