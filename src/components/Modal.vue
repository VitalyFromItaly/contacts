<template>
<div id="modal" class="relative">
  <button @click="$emit('close')" class="fixed inset-0 w-full h-100 bg-gray-800 bg-opacity-80"></button>
  <div class="z-10 absolute top-0 text-gray-400 w-5/6 sm:w-2/3 lg:w-1/2 overflow-y-auto">
    <div class="flex flex-col items-start rounded-xl overflow-hidden bg-gray-900 ">
      <div class="flex items-center w-full py-1 md:py-4 px-5 bg-gray-800 ">
        <div class="  text-gray-300  font-medium sm:text-sm md:text-xl">
          <slot name="header"></slot>
        </div>
        <svg @click="$emit('close')" class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </svg>
      </div>
      <hr />
      <div class="text-gray-300  font-medium ">
        <slot name="body"></slot>
      </div>
      <hr />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "modal",
};
</script>
