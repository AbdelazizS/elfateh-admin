<template>
  <Loader noBg v-if="Loading" />
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal class="h-6 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <!-- <div class="flex items-center">
          <div class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted"> -->

        <div
          class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted rtl-dir"
        >
          <div class="flex items-center rtl-dir">
            <EditButton :item="props.item" />
          </div>
        </div>

        <!-- </div> -->
        <!-- <DropdownMenuItem asChild> -->
        <!-- </DropdownMenuItem> -->

        <DropdownMenuItem asChild>
          <DialogTrigger class="cursor-pointer rtl-dir" asChild>
            <div class="flex items-center rtl-dir font-semibold">
              <Trash class="h-6 me-1" />

              {{ $t('delete') }}
            </div>
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent class="">
      <DialogTitle>
        {{ $t('confirm_delete') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('confirm_delete_message') }}
        <!-- {{ props.item.id }} -->
      </DialogDescription>
      <DialogFooter>
        <div class="flex gap-4 justify-end">
          <DialogClose>
            <Button @click="handelDelete" variant="destructive">
              {{ $t('delete') }}
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="outline">
              {{ $t('cancel') }}
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { DialogClose } from 'radix-vue'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-vue-next'
import EditButton from './EditButton.vue'
import Loader from '@/components/Loader.vue'

import { deleteDeliveryBoy } from '@/services/api.js'

import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/authStore'
import { useDeliveryStore } from '@/stores/appStore'

const { toast } = useToast()

const authStore = useAuthStore()
const deliveryStore = useDeliveryStore()

const Loading = ref(false)

const props = defineProps({
  item: { type: Object }
})

const handelDelete = () => {
  Loading.value = true

  const token = authStore.token
  const id = props.item.ID

  deleteDeliveryBoy({ id, token })
    .then((res) => {
      console.log(res);
      
      Loading.value = false
      deliveryStore.getItems(authStore.token)
      if (res.data.status === true) {
        toast({
          title: 'delete_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error);
      
      Loading.value = false
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })
}
</script>

<style scoped></style>
