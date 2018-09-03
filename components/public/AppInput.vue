<template>
  <div class="app-input">
    <input :type="type" ref="input" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'placeholder',
    'value'
  ]
}
</script>

<style lang="stylus" scoped>
.app-input
  input
    margin 5px 0
    padding 10px 0
    border none
    border-radius 5px
    outline 0
    width 100%
    text-align center
    font-size 16px
</style>
