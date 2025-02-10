<template>
  <Loader v-if="loading" noBg />

  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <!-- DialogContent  -->

    <DialogContent class="!max-w-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('orders_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('orders_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <!-- form -->

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
          <div class="flex items-baseline gap-2">
            <BaseInput
              v-model="form.client_id"
              class="w-1/2"
              :placeholder="$t(`notifications_page.user_id`)"
              name="client_id"
              type="number"
              :label="$t(`notifications_page.user_id`)"
            />
            <BaseInput
              :value="form.total_price"
              v-model="form.total_price"
              class="w-1/2"
              :placeholder="$t(`total`)"
              name="total_price"
              type="number"
              :label="$t(`total`)"
            />
          </div>
          <div class="flex items-baseline gap-2">
            <BaseInput
              v-model="form.transportation_cost"
              class="w-1/2"
              :placeholder="$t(`Transportation_Cost`)"
              name="transportation_cost"
              type="number"
              :label="$t(`Transportation_Cost`)"
            />

            <FormField v-slot="{ componentField }" name="state" v-model="form.state">
              <FormItem class="w-1/2">
                <FormLabel>
                  {{ $t('orders_page.state') }}
                </FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="$t('orders_page.state')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <div v-if="!states?.length" v-for="item in 4" :key="item">
                        <Skeleton class="h-12 w-full rounded-none" />
                      </div>
                      <SelectItem
                        v-else
                        v-for="item in states"
                        :key="item.id"
                        :item="item"
                        :value="item.state_name"
                      >
                        {{ item.state_name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>
          </div>

          <div class="flex items-baseline gap-2">
            <FormField v-slot="{ componentField }" name="locality" v-model="form.locality">
              <FormItem class="w-1/2">
                <FormLabel>
                  {{ $t('orders_page.locality') }}
                </FormLabel>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="$t('orders_page.locality')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <div v-if="!localities?.length" v-for="item in 4" :key="item">
                        <Skeleton class="h-12 w-full rounded-none" />
                      </div>
                      <SelectItem
                        v-else
                        v-for="item in localities"
                        :key="item.id"
                        :item="item"
                        :value="item.locality_name"
                      >
                        {{ item.locality_name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>

            <BaseInput
              v-model="form.location"
              class="w-1/2"
              :placeholder="$t(`Location`)"
              name="location"
              :label="$t(`Location`)"
            />
          </div>

          <div class="flex items-baseline gap-2">
            <BaseInput
              v-model="form.prominent_place"
              class="w-1/2"
              :placeholder="$t(`prominent_place`)"
              name="prominent_place"
              :label="$t(`prominent_place`)"
            />

            <BaseInput
              v-model="form.product_id"
              class="w-1/2"
              :placeholder="$t(`product_id`)"
              name="product_id"
              type="number"
              :label="$t(`product_id`)"
            />
          </div>

          <div class="flex items-baseline gap-2">
            <BaseInput
              :value="form.product_name"
              v-model="form.product_name"
              class="w-1/2"
              :placeholder="$t(`products_page.product_name`)"
              name="product_name"
              :label="$t(`products_page.product_name`)"
            />
            <BaseInput
              :value="form.product_price"
              v-model="form.product_price"
              class="w-1/2"
              :placeholder="$t(`products_page.product_price`)"
              name="product_price"
              type="number"
              :label="$t(`products_page.product_price`)"
            />
            <BaseInput
              :value="form.quantity"
              v-model="form.quantity"
              class="w-1/2"
              :placeholder="$t(`quantity`)"
              name="quantity"
              type="number"
              :label="$t(`quantity`)"
            />
            <BaseInput
              :value="form.product_transportation_cost"
              v-model="form.product_transportation_cost"
              class="w-1/2"
              :placeholder="$t(`Transportation_Cost_1`)"
              name="product_transportation_cost"
              type="number"
              :label="$t(`Transportation_Cost_1`)"
            />
          </div>

          <DialogFooter class="flex items-end">
            <!-- <DialogClose> -->
            <Button type="submit">
              {{ $t('orders_page.add_order') }}
            </Button>
            <!-- </DialogClose> -->
          </DialogFooter>
        </vee-form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
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

import { Plus } from 'lucide-vue-next'

import BaseInput from '@/components/BaseInput.vue'

import { onMounted, ref, watch } from 'vue'
import { getStates, getLocalities, addOrder } from '@/services/api.js'
import Loader from '@/components/Loader.vue'
import Button from '@/components/ui/button/Button.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores/authStore'
import { useOrdersStore } from '@/stores/appStore.js'
import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'


defineRule('required', required)


const schema = {

  client_id: { required: true },
  total_price: { required: true },
  locality: { required: true },
  state: { required: true },
  location: { required: true },
  // locality_id: { required: true },
  // state_id: { required: true },
  prominent_place: { required: true },
  transportation_cost: { required: true },
  //
  product_id: { required: true },
  product_name: { required: true },
  product_price: { required: true },
  quantity: { required: true },
  product_transportation_cost: { required: true },
}






const ordersStore = useOrdersStore()
const loading = ref(false)
const authStore = useAuthStore()
const token = authStore.token
const { toast } = useToast()
const localities = ref([])
const states = ref([])
const form = ref({
  client_id: '',
  total_price: '',
  locality: '',
  state: '',
  locality_id: '',
  location: '',
  state_id: '',
  prominent_place: '',
  transportation_cost: '',
  //
  product_id: '',
  product_name: '',
  product_price: '',
  quantity: '',
  product_transportation_cost: ''
})
onMounted(() => {
  getStates()
    .then((res) => {
      states.value = res.data.data.states
    })
    .catch((err) => {})
})

watch(
  () => form.value.state,
  (state) => {
    form.value.locality = ''
    const Item = states.value.find((x) => x.state_name === state)
    form.value.state_id = Item.state_id

    getLocalities(Item.state_id)
      .then((res) => {
        localities.value = res.data.data.locality
      })
      .catch((err) => {})
  }
)

watch(
  () => form.value.locality,
  (locality) => {
    if (form.value.locality !== '') {
      const Item = localities.value.find((x) => x.locality_name === locality)
      form.value.locality_id = Item.locality_id
    }
  }
)

// handelAdd

const handelAdd = (values) => {
  loading.value = true
  addOrder({ ...values, token, locality_id: form.value.locality_id, state_id: form.value.state_id })
    .then((res) => {
      loading.value = false
      if (res.data.succNum === 201) {
        ordersStore.getItems(authStore.token)
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
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

<style></style>
