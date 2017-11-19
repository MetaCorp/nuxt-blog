<template>
  <div class="container flex mx-auto my-4">
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
      </ul>
    </span>
    <span class="flex items-center">
      <img src="http://via.placeholder.com/150x150" height="36" alt="" class="rounded-full mr-2">
      <p class="text-sm">sign in | sign up</p>
    </span>
  </div>
</template>
