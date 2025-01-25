import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
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
    accessorKey: 'Category_name',
    header: () => h(TransLate, { item: { key: 'category_name' } })
  },
  // {
  //   accessorKey: 'product_description',
  //   header: 'Product description',
  //   cell: (info: Record<string, any>) => (info.getValue().slice(0,20) + ' .....')
  // },

  // {
  //   accessorKey: 'product_price',
  //   header: ({ column }) =>
  //     h(ColumnHeader, {
  //       column: column,
  //       title: 'Product Price'
  //     })
  // },

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
