<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
      <span class="expand-key">发帖次数: </span>
      <span class="expand-value">{{ row.postCount }}次</span>
      </Col>
      <Col span="6">
      <span class="expand-key">解答次数: </span>
      <span class="expand-value">{{ row.replyCount }}次</span>
      </Col>
      <Col span="6">
      <span class="expand-key">活跃程度: </span>
      <span class="expand-value">{{ row.liveness }}（最近发帖: {{ row.oneYearPost }}次， 最近解答次数: {{ row.oneYearReply }}次）</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <span class="expand-key">简介: </span>
      <span class="expand-value">{{ row.intro }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object
    }
  }
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
