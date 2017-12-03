<template>
  <div class="p-4">
    <div>
      <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center mr-4">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Google</span>
      </button>
      <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Facebook</span>
      </button>
    </div>
    <div class="or">or</div>
    <div>
      <div class="material-field">
        <input placeholder="Username" type="text" class="w-full py-2" required />
        <span class="bar"></span>
      </div>
      <div class="material-field">
        <input placeholder="Username" type="text" class="w-full py-2" required />
        <span class="bar"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.material-field input {
  border: none;
  border-bottom: 1px solid #aaa;
  outline: 0;
}
.material-field input:focus {
  border-bottom: 1px solid #5264AE;
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
  background: #5264AE;
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
