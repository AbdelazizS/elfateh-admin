<template>
  <Dialog  >
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DialogTrigger>

          <DropdownMenuItem> <Edit className="h-3 w-3 ms-2" /> Edit </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem asChild>
          <DialogTrigger asChild>
            <div className="flex items-center"><Trash className="h-8 w-8 ms-2" /> Delete</div>
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <DialogContent>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogDescription> Are you sure you want to delete {{props.first_name}}? </DialogDescription>
      <DialogFooter>

        <div class="flex gap-4 ">
          
          <DialogClose>
            <Button @click="handelDelete()" variant="destructive"> Delete </Button>
          </DialogClose>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
import { Edit, MoreHorizontal, Trash } from 'lucide-vue-next'

const props = defineProps({
  item: { type: Object }
})

const handelDelete = () => {
  console.log(props.item.id)
}
</script>

<style scoped></style>
