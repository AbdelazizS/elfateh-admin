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
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'image',
    header: () => h(TransLate, { item: { key: 'banners_page.banner_image' } }),

    cell: ({ row }) => {
      const imageSrc = row.original.image

      
      return h('img', {
        src: imageSrc,
        alt: 'image',
        style: {
          width: '160px',
          height: '160px'
        }
      })
    }
  },
  {
    accessorKey: 'title',
    header: () => h(TransLate, { item: { key: 'banners_page.banner_title' } })
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
