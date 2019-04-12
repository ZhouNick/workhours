<template>
  <div class="page-hours-confirmation">
    <group>
      <selector title="title"></selector>
    </group>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
export default {
  name: 'page-hours-confirmation',
  components: {
    Group,
    XInput,
    XButton
  },
  data () {
    return {
      project: []
    }
  }
}
</script>
