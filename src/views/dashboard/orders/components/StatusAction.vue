<template>
  <Loader v-if="loading" noBg />
  <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <ClipboardPenLineIcon class="h-6 w-8" />
          {{ props.item.ID }}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DialogTrigger class="cursor-pointer rtl-dir" asChild>
            <div class="flex items-center rtl-dir font-semibold">
              <ClipboardPenLineIcon class="h-6 me-1" />
              {{ $t('update') }}
            </div>
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <DialogContent class="sm:max-w-[425px]">
      <DialogTitle>
        {{ $t('orders_page.edit_status') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('orders_page.confirm_edit_status') }}
        <!-- {{ props.item.id }} -->
      </DialogDescription>
      <vee-form :validation-schema="schema" @submit="handelUpdate" class="space-y-6">
        <FormField v-slot="{ componentField }" name="status_id">
          <FormItem class="w-1/2">
            <FormLabel>
              {{ $t('orders_page._status') }}
            </FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue :placeholder="$t('orders_page._status')" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="item in [
                      {
                        status: 'Open',
                        status_id: '1'
                      },
                      {
                        status: 'in Progress',
                        status_id: '2'
                      },
                      {
                        status: 'completed',
                        status_id: '3'
                      }
                    ]"
                    :key="item.status_id"
                    :item="item"
                    :value="item.status_id"
                  >
                    {{ item.status }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>

        <!-- <Skeleton class="h-24 w-24" /> -->

        <DialogFooter>
          <div class="flex gap-4 justify-end">
            <DialogClose>
              <Button type="submit">
                {{ $t('save_changes') }}
              </Button>
            </DialogClose>
            <DialogClose>
              <Button variant="outline">
                {{ $t('cancel') }}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </vee-form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { updateOrder } from '@/services/api.js'
import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import { ClipboardPenLineIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useOrdersStore } from '@/stores/categoriesStore'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const authStore = useAuthStore()
const ordersStore = useOrdersStore()
const { toast } = useToast()

const props = defineProps({
  item: { type: Object }
})

const loading = ref(false)
const schema = {
  status_id: { required: true }
}

const handelUpdate = (values) => {
  const token = authStore.token

  console.log(values)

  loading.value = true
  updateOrder({ order_id: props.item.ID, status_id: values.status_id, token })
    .then((res) => {
      console.log(res)
      loading.value = false
      if (res.data.succNum === 200) {
        ordersStore.getItems(token)
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error)

      loading.value = false
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
