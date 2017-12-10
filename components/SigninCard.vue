<template>
  <div class="p-4 overflow-hidden shadow">
    <transition name="shrink">
      <div v-if="!showAuth">
        <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center w-40 mr-4 justify-center">
          <svg class="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" aria-label="Google" role="img" viewBox="0 0 512 512"><rect width="512" height="512" fill="transparent" rx="15%"/><g fill="none" fill-rule="evenodd"><path fill="#4285f4" d="M482.6 261.4c0-16.8-1.5-33-4.3-48.3H256v91.6h127c-5.5 29.5-22 54.5-47 71.2V435h76c44.6-41 70.4-101.7 70.4-173.5z"/><path fill="#34a853" d="M256 492c63.7 0 117-21 156.2-57.2L336 375.6c-21.2 14.2-48.2 22.5-80 22.5-61.5 0-113.5-41.2-132-97H45v61c39 77 118.7 130 211 130z"/><path fill="#fbbc05" d="M124 300.8c-4.8-14-7.4-29.3-7.4-44.8s2.6-30.7 7.4-44.8V150H45c-16 32-25 68-25 106s9 74 25 106l79-61.2z"/><path fill="#ea4335" d="M256 114c34.6 0 65.8 11.8 90.2 35L414 81.7C373 43.5 319.5 20 256 20 163.7 20 84 73 45 150l79 61.2c18.5-55.8 70.5-97.3 132-97.3z"/><path d="M20 20h472v472H20V20z"/></g></svg>
          <span>Google</span>
        </button>
        <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center w-40 justify-center">
          <svg class="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" aria-label="Facebook" role="img" viewBox="0 0 512 512"><rect width="512" height="512" fill="#3b5998" rx="15%"/><path fill="#fff" d="M287 456V157c0-21 6-35 35-35h38V59c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254H152v72h196"/></svg>
          <span>Facebook</span>
        </button>
        <div class="or">or</div>
      </div>
    </transition>
    <div>
      <div class="material-field relative">
        <input v-model="username" placeholder="Username" type="text" class="w-full py-1" required />
        <span class="bar"></span>
      </div>
      <transition name="grow">
        <div v-if="showAuth">
          <div class="material-field">
            <input placeholder="Password" type="password" class="w-full py-1 mt-3" required />
            <span class="bar"></span>
          </div>
          <div class="mt-4">
            <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center w-40 justify-center mr-4">
              <span>Register</span>
            </button>
            <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center w-40 justify-center">
              <span>Signin</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  computed: {
    showAuth () {
      return this.username.length
    }
  }
}
</script>


<style scoped>
.shrink-enter-active, .shrink-leave-active {
  transition: margin-top .5s;
}
.shrink-enter, .shrink-leave-to {
  margin-top: -90px;
}
.grow-enter-active, .grow-leave-active {
  transition: height .5s;
  height: 88px;
}
.grow-enter, .grow-leave-to {
  height: 0;
}

.material-field input {
  border: none;
  border-bottom: 1px solid #aaa;
  outline: 0;
}
.material-field input:focus {
  border-bottom: 1px solid #3B8070;
}

/* BOTTOM BARS ================================= */
.material-field .bar {
  position:relative;
  display:block;
  width:100%;
}
.material-field .bar:before, .material-field .bar:after {
  content: '';
  height: 1px; 
  width: 0;
  bottom: 1px; 
  position: absolute;
  background: #3B8070;
  transition: 0.2s ease all; 
}
.material-field .bar:before {
  left: 50%;
}
.material-field .bar:after {
  right: 50%; 
}

.material-field input:focus ~ .bar:before, .material-field input:focus ~ .bar:after {
  width: 50%;
}

.or {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.or::before,
.or::after {
  position: absolute;
  width: calc(50% - 24px);
  height: 1px;
  top: 24px;
  background-color: #aaa;
  content: '';
}
.or::before {
  left: 0;
}
.or::after {
  right: 0;
}
</style>
