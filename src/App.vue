<script setup lang="ts">
// 根组件：星空背景 + 导航 + 各区块组装
import SiteHeader from './components/layout/SiteHeader.vue';
import SiteFooter from './components/layout/SiteFooter.vue';
import HeroSection from './components/sections/HeroSection.vue';
import EcosystemMap from './components/sections/EcosystemMap.vue';
import ProductSection from './components/sections/ProductSection.vue';
import QuickStartSection from './components/sections/QuickStartSection.vue';
import { products } from './data';
</script>

<template>
  <div class="starfield" aria-hidden="true" />
  <SiteHeader />
  <main>
    <HeroSection />
    <EcosystemMap />
    <ProductSection v-for="product in products" :key="product.id" v-reveal :product="product" />
    <QuickStartSection />
  </main>
  <SiteFooter />
</template>
