import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTableDropDown from './DataTableDropDown.vue'
import TransLate from '@/components/TransLate.vue'
export interface product {
  id: number
}

export const columns: ColumnDef<product>[] = [
  {
    accessorKey: 'ID',
    header: 'ID'
  },

  {
    accessorKey: 'Name',
    header: () => h(TransLate, { item: { key: 'user_name' } })
  },
  {
    accessorKey: 'Email',
    header: () => h(TransLate, { item: { key: 'auth.email' } })
  },
  {
    accessorKey: 'edit',
    header: '',

    cell: ({ row }) => {
      const item = row.original

      return h(DataTableDropDown, {
        // Item,
        item
      })
    }
  }
]
