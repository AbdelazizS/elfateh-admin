import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DataTableDropDown from './DataTableDropDown.vue'
import TransLate from '@/components/TransLate.vue'

export interface offer {
  id: number
  Image: string
  'Offer_Title': string
  'Offer_Price': string | number
}

export const columns: ColumnDef<offer>[] = [
  {
    accessorKey: 'ID',
    header: 'ID'
  },
  {
    accessorKey: 'Offer_Title',
    header: () => h(TransLate, { item: { key: 'offers_page.offer_name' } })
  },

  {
    accessorKey: 'Offer_Price',
    header: () => h(TransLate, { item: { key: 'offers_page.offer_price' } })
  },

  {
    accessorKey: 'Image',
    header: () => h(TransLate, { item: { key: 'offers_page.offer_image' } }),

    cell: ({ row }) => {
      const imageSrc = row.original.Image

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
