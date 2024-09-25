<template>
    <div
      :class="['card', { 'card-active': isActive }]"
      @click="onClick"
    >
      <div class="card-content">
        <img :src="img" alt="Card Image" class="category-img" v-if="!isPlaceholder" />
        <div :class="['card-title', { 'text-active': isActive }]">
          {{ title }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      img: {
        type: String as PropType<string>,
        default: '',
      },
      title: {
        type: String as PropType<string>,
        default: '',
      },
      isActive: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      isPlaceholder: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      onClick: {
        type: Function as PropType<() => void>,
        default: () => {},
      },
    },
  });
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(56, 85, 180, 0.747);
    height: 180px;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .card-active {
    border-color: #d5f0db;
    background-color: #f9f9f9;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  
  .category-img {
    max-height: 80px;
    max-width: 80px;
    object-fit: contain;
  }
  
  .card-title {
    margin-top: 16px;
    font-size: 1rem;
    color: black;
  }
  
  .text-active {
    color: #0f76d1;
  }
  </style>
  