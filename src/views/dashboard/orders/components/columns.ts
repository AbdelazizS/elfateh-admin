import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import ColumnHeader from './ColumnHeader.vue'
import DataTableDropDown from './DataTableDropDown.vue'
import StatusAction from './StatusAction.vue'

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
    accessorKey: 'Client Name',
    header: 'Client Name'
  },
  {
    accessorKey: 'Date',
    header: 'Date',
    //  header: () => h(TransLate, { item: { key: 'product_description' } }),
    cell: (info) => new Date(info.getValue()).toLocaleString()
  },
  { accessorKey: 'Delivery Boy', header: 'Delivery Boy' },
  {
    accessorKey: 'Location',
    header: 'Location'
  },
  {
    accessorKey: 'Order Status',
    cell: ({ row }) => {
      const item = row.original

      return h(StatusAction, {
        // Item,
        item
      })
    }
  },
  {
    accessorKey: 'Transportation Cost',
    header: ({ column }) =>
      h(ColumnHeader, {
        column: column,
        title: 'Transportation Cost'
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
