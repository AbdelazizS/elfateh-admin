<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()


import Pagination from './pagination.vue'


const sorting = ref([])
const columnFilters = ref([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),

  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    }
  }
})
</script>

<template >
  <Input
  v-if="props?.data?.length" 
    class="max-w-sm mb-4"
    :placeholder="$t('delivery_page.filter_notifications_by_names')"
    :model-value="table.getColumn('user_name')?.getFilterValue()"
    @update:model-value="table.getColumn('user_name')?.setFilterValue($event)"
  />

  
  <div  v-if="props?.data?.length"   class="border rounded-md">
    <Table>
      <TableHeader class="bg-primary/10 dark:bg-primary/5">
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead class="rtl-dir text-foreground" v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <!-- <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <Skeleton class="w-[100px] h-5 rounded-full" />
            </TableCell>
          </TableRow>
        </template> -->
      </TableBody>
    </Table>


  </div>
  <Pagination v-if="props?.data?.length"  :table="table" />
</template>
