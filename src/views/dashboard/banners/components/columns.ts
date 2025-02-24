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
    header: () => h(TransLate, { item: { key: 'banners_page.banner_image' } }),

    cell: ({ row }) => {
      const imageSrc = row.original.Image

      console.log(row);
      

      return h('img', {
        src:imageSrc,
        alt: 'Example Image',
        width: 120,
      })
    }
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
