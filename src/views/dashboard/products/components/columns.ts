import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import ColumnHeader from './ColumnHeader.vue'
import DataTableDropDown from './DataTableDropDown.vue'

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
    accessorKey: 'Name',
    header: () => h(TransLate, { item: { key: 'product_name' } }),
  },
  {
    accessorKey: 'Product_Description',

    header: () => h(TransLate, { item: { key: 'product_description' } }),
    cell: (info: Record<string, any>) => info.getValue().slice(0, 40) + ' .....'
  },
  {
    accessorKey: 'Category_Name',
    header: () => h(TransLate, { item: { key: 'category_name' } }),
  },

  {
    accessorKey: 'Product_Price',
    header: ({ column }) =>
      h(ColumnHeader, {
        column: column,
        title: 'product_price'
      })
  },

  // {
  //   accessorKey: 'created_at',
  //   header: 'Created',
  //   cell: (info: Record<string, any>) => format(new Date(info.getValue()), 'dd/MM/yyyy')
  // },
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
