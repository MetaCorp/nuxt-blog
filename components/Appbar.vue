<template>
  <div class="container flex mx-auto py-4">
    <span>
      <img src="http://via.placeholder.com/150x150" height="48" alt="">
    </span>
    <span class="flex flex-grow items-center justify-center">
      <ul class="list-reset inline-block">
        <li class="inline-block hover:text-blue-dark mx-4">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="inline-block hover:text-blue-dark mx-4">
          <nuxt-link to="/test">Test</nuxt-link>
        </li>
        <li class="inline-block hover:text-blue-dark mx-4">
          <nuxt-link to="/new">New</nuxt-link>
        </li>
      </ul>
    </span>
    <v-popover class="flex items-center" offset="8">
      <span class="flex items-center">
        <img src="http://via.placeholder.com/150x150" height="36" alt="" class="rounded-full mr-2">
        <p class="text-sm">sign in | sign up</p>
      </span>
      <signin-card slot="popover">
      </signin-card>
    </v-popover>
  </div>
</template>

<script>
import SigninCard from '@/components/SigninCard'
export default {
  data () {
    return {

    }
  },
  components: {
    SigninCard
  }
}
</script>

<style>
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: white;
  color: black;
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: white;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s, transform .15s;
  transform: translateY(16px);
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
  transform: translateY(0px);
}

.tooltip[aria-hidden='true'] > .wrapper {
  transition: transform .15s;
  transform: translateY(-8px);
}

.tooltip[aria-hidden='false'] > .wrapper {
  transition: transform .15s;
  transform: translateY(0px);
}
</style>
