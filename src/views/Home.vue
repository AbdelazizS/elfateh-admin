<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DateRangePicker } from '@/components/ui/daterange-picker'
import RecentSales from '@/components/examples/RecentSales.vue'
import Overview from '@/components/examples/Overview.vue'
import Heading from '@/components/heading.vue'

import { AreaChart } from '@/components/ui/chart-area'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 2000) + 500
  }
]
</script>

<template>
  <div>
    <Heading
      :title="`${$t('dashboard')}`"
      :description="`${$t('dashboard_description')}`"
    />
    <!-- <page-header title="Dashboard">
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button>Download</Button>
      </div>
    </page-header> -->

    <Tabs default-value="overview" class="space-y-4">
      <!-- <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
      </TabsList> -->
      <TabsContent value="overview" class="space-y-4">
        <div class="rtl-dir grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          <Card class="rtl-dir" >
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                {{ $t('total_payments') }}
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">$45,231.89</div>
              <p class="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card class="rtl-dir">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> 
                {{ $t('total_users') }}
               </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+2350</div>
              <p class="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card class="rtl-dir">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> 
                {{ $t('total_orders') }}
               </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">+12,234</div>
              <p class="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
          </Card>
          
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card class="col-span-4 " >
            <CardHeader>
              <CardTitle class="rtl-dir" >
                {{ $t('overview') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="ps-2">
              <AreaChart :data="data" index="name" :categories="['total', 'orders']" />
            </CardContent>
          </Card>
          <Card class="col-span-3 rtl-dir">
            <CardHeader>
              <CardTitle>
                {{ $t('last_sales') }}
              </CardTitle>
              <!-- <CardDescription> You made 265 sales this month. </CardDescription> -->
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
