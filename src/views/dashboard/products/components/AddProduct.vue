<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('products_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('products_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
          <div class="flex items-baseline gap-2">
            <BaseInput
              :value="form.name"
              v-model="form.name"
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
                <Select v-bind="componentField">
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
          <FormField v-slot="{ componentField }" name="product_description">
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
              :value="form.price"
              class="w-1/2"
              v-model="form.price"
              :placeholder="$t(`products_page.product_price`)"
              name="product_price"
              type="number"
              :label="$t(`products_page.product_price`)"
            />
            <BaseInput
              :value="form.price_old"
              class="w-1/2"
              v-model="form.price_old"
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
              :label="$t(`products_page.product_image`)"
            />

            <div v-if="form.image" class="">
              <img :src="form.image" class="h-16 w-16" alt="" />
            </div>
          </div>

          <DialogFooter class="flex items-end">
            <!-- <DialogClose> -->
            <Button type="submit">
              {{ $t('products_page.add_product') }}
            </Button>
            <!-- </DialogClose> -->
          </DialogFooter>
        </vee-form>
      </div>
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
import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

import { addProduct } from '@/services/api.js'

import { Plus } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCategoriesStore, useProductsStore } from '@/stores/appStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'

defineRule('required', required)

const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()
const { toast } = useToast()
const Router = useRouter()

const schema = {
  product_name: { required: true },
  product_description: { required: true },
  product_price: { required: true },
  product_price_old: { required: true },
  category: { required: true },
  image: { required: true }
}

onMounted(() => {
  categoriesStore.getItems(authStore.token)
})

function previewFile() {
  const preview = document.querySelector('img')
  const file = document.querySelector('input[type=file]').files[0]
  const reader = new FileReader()

  reader.onloadend =  () =>  {
    form.value.image = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
  } else {
    preview.src = ''
  }
}

const handelAdd = (values) => {
  const token = authStore.token

  const Item = categoriesStore.Items.find((x) => x.Category_name === values.category)

  loading.value = true
  addProduct({ ...values, token, category_id: Item.ID })
    .then((res) => {
      loading.value = false
      if (res.data.succNum === 200) {
        productsStore.getItems(authStore.token)
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

const loading = ref(false)
const form = ref({
  name: '',
  file: '',
  image: ''
})
</script>

<style scoped></style>