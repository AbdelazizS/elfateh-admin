<template>
  <Loader noBg v-if="Loading" />
  <Dialog class="m-2">
    <DialogTrigger>
      <div class="flex items-center font-semibold">
        <Edit class="h-5 me-1" />
        {{ $t('update') }}
      </div>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('update_data') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('update_data_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelUpdate" class="space-y-6">
          <div class="flex items-baseline gap-2">
            <BaseInput
              :value="form.product_name"
              v-model="form.product_name"
              class="w-1/2"
              :placeholder="$t(`products_page.product_name`)"
              name="product_name"
              :label="$t(`products_page.product_name`)"
            />

            <FormField v-slot="{ componentField }" name="category">
              <FormItem class="w-1/2">
                <FormLabel>
                  {{ $t('categories_page.category_name') }}
                </FormLabel>
                <Select defaultValue="form.category" v-bind="componentField" :value="form.category">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue :placeholder="$t('categories_page.category_name')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <Skeleton
                        v-if="!categoriesStore.Items?.length"
                        v-for="item in 4"
                        :key="item"
                        class="h-12 w-full rounded-none"
                      />
                      <SelectItem
                        v-else
                        v-for="item in categoriesStore.Items"
                        :key="item.Id"
                        :item="item"
                        :value="item.Category_name"
                      >
                        {{ item.Category_name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>
          </div>

          <FormField
            :value="form.product_description"
            v-slot="{ componentField }"
            name="product_description"
          >
            <FormItem class="">
              <FormLabel>
                {{ $t('products_page.product_description') }}
              </FormLabel>
              <FormControl>
                <Textarea
                  :placeholder="$t(`products_page.product_description`)"
                  class="resize-none outline-0 w-full"
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormMessage /> -->
            </FormItem>
          </FormField>

          <div class="flex items-center gap-2">
            <BaseInput
              :value="form.product_price"
              class="w-1/2"
              v-model="form.product_price"
              :placeholder="$t(`products_page.product_price`)"
              name="product_price"
              type="number"
              :label="$t(`products_page.product_price`)"
            />
            <BaseInput
              :value="form.product_price_old"
              v-model="form.product_price_old"
              class="w-1/2"
              :placeholder="$t(`products_page.product_price_old`)"
              name="product_price_old"
              type="number"
              :label="$t(`products_page.product_price_old`)"
            />
          </div>

          <div class="">
            <FileInput
              :value="form.image"
              v-model="form.image"
              :onchange="previewFile"
              :label="$t(`categories_page.category_image`)"
            />

            <!-- 
           * 1-from props 
           * 2-stat changes image 
           -->
            <img v-if="form.file" :src="form.image ? form.image : form.file" class="mt-1 h-16 w-16" />
          </div>

          <!-- <Skeleton class="h-24 w-24" /> -->

          <DialogFooter class="flex items-end">
            <DialogClose>
            <Button type="submit">
              {{ $t('save_changes') }}
            </Button>
            </DialogClose>
          </DialogFooter>
        </vee-form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
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

import Textarea from '@/components/ui/textarea/Textarea.vue'

import { required, min } from '@vee-validate/rules'
import { Edit } from 'lucide-vue-next'
import { defineRule } from 'vee-validate'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'
import { useCategoriesStore ,useProductsStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'

import { updateProduct } from '@/services/api.js'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('min', min)

const schema = {
  product_name: { required: true },
  product_description: { required: true },
  product_price: { required: true },
  product_price_old: { required: true },
  category: { required: true }
  // image: { required: true }
}
const { toast } = useToast()

const Loading = ref(false)
const form = ref({
  product_name: props.item.Name,
  category: props.item.Category_Name,
  product_description: props.item.Product_Description,
  product_price: props.item.Product_Price,
  product_price_old: props.item.Product_Price_Old,
  file: props.item.Image,
  image: ''
})

console.log(props)

const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()
const authStore = useAuthStore()

const token = authStore.token
const id = props.item.ID

const handelUpdate = (values) => {
  console.log(values, 'values')

  const Item = categoriesStore.Items.find((x) => x.Category_name === values.category)

  updateProduct({ ...values, category_id: Item.ID, token, product_id: id })
    .then((res) => {
      console.log(res)
      productsStore.getItems(authStore.token)
      if (res.data.succNum === 200) {
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error)

      // Loading.value = false
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })
}

function previewFile() {
  const preview = document.querySelector('img')
  const file = document.querySelector('input[type=file]').files[0]
  const reader = new FileReader()

  reader.onloadend = () => {
    form.value.image = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
  } else {
    preview.src = ''
  }
}
</script>