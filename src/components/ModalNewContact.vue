<template>
  <div id="modal" class="relative">
    <button
      @click="$emit('close')"
      class=" fixed inset-0 w-full h-full bg-gray-800 bg-opacity-80"
    ></button>
    <div
      class="dark:text-gray-600 z-10 absolute top-0 text-gray-400 w-5/6 md:w-2/3 lg:w-1/2"
    >
      <div
        class="flex flex-col items-start rounded-xl overflow-hidden bg-gray-900 dark:bg-gray-50"
      >
        <div
          class="flex items-center w-full p-4 bg-gray-800 dark:bg-gray-100"
        >
          <div
            class="dark:text-gray-900 text-gray-300  font-medium sm:text-sm md:text-xl"
          >
            <slot name="header"></slot>
          </div>
          <svg @click="$emit('close')"
            class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
        </div>
        <hr class="" />
        <div class="text-gray-300  font-medium ">
          <slot name="body"> </slot>
        </div>
        <hr />
        <div class="ml-auto">
          <button
            @click="$emit('close')"
            class=" mr-4 mb-4 focus:outline-none bg-gray-200 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
          >
            Add a contact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
};
</script>