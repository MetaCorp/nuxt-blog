<template>
  <div class="flex flex-col flex-grow">
    <appbar></appbar>
    <nuxt/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Appbar from '@/components/Appbar'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    Appbar,
    AppFooter
  }
}
</script>
