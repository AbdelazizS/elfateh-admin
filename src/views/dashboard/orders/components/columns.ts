import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import ColumnHeader from './ColumnHeader.vue'
import DataTableDropDown from './DataTableDropDown.vue'
import StatusAction from './StatusAction.vue'
import TransLate from '@/components/TransLate.vue'

export interface product {
  id: number
  // name: string;
  // email: string;
}

export const columns: ColumnDef<product>[] = [
  {
    accessorKey: 'ID',
    header: 'ID'
  },
  {
    accessorKey: 'Client_Name',
    header: () => h(TransLate, { item: { key: 'Client_Name' } })
    
  },
  {
    accessorKey: 'Date',
    header: () => h(TransLate, { item: { key: 'Date' } }),
    cell: (info) => new Date(info.getValue()).toLocaleString()
  },
  { accessorKey: 'Delivery_Boy',


    header: () => h(TransLate, { item: { key: 'Delivery_Boy' } })
   },
  {
    accessorKey: 'Location',
    header: () => h(TransLate, { item: { key: 'Location' } })
  },
  {
    accessorKey: 'Order_Status',
    header: () => h(TransLate, { item: { key: 'Order_Status' } }),
    cell: ({ row }) => {
      const item = row.original

      return h(StatusAction, {
        // Item,
        item
      })
    }
  },
  {
    accessorKey: 'Transportation_Cost',
    header: ({ column }) =>
      h(ColumnHeader, {
        column: column,
        title: 'Transportation_Cost'
      })
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
