<script setup lang="ts">
// 使用方法：编号步骤时间线 + 演示账号卡
import type { UsageStep, DemoAccount } from '../../types';

defineProps<{
  steps: readonly UsageStep[];
  demo: DemoAccount | null;
  productName: string;
}>();
</script>

<template>
  <div class="usage glass">
    <h3 class="u-title">📖 使用方法</h3>
    <ol class="u-steps">
      <li v-for="(step, index) in steps" :key="step.title" class="u-step">
        <span class="u-no">{{ index + 1 }}</span>
        <div class="u-body">
          <strong>{{ step.title }}</strong>
          <p>{{ step.desc }}</p>
        </div>
      </li>
    </ol>
    <div v-if="demo" class="u-demo">
      <p class="u-demo-label">{{ productName }} · 演示凭据</p>
      <p class="u-demo-row"><span>账号</span><code>{{ demo.account }}</code></p>
      <p class="u-demo-row"><span>密码 / 说明</span><code>{{ demo.password }}</code></p>
    </div>
  </div>
</template>

<style scoped>
.usage {
  padding: 24px 22px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.u-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.u-steps {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.u-step {
  position: relative;
  display: flex;
  gap: 14px;
  padding-bottom: 22px;
}

/* 步骤之间的竖向连线 */
.u-step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 34px;
  bottom: -2px;
  width: 1.5px;
  background: linear-gradient(180deg, rgba(125, 211, 252, 0.4), rgba(125, 211, 252, 0.06));
}

.u-no {
  flex-shrink: 0;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: #06121f;
  background: linear-gradient(120deg, var(--accent), var(--moon));
  box-shadow: 0 0 16px rgba(125, 211, 252, 0.35);
}

.u-body strong {
  font-size: 15px;
}

.u-body p {
  margin-top: 4px;
  font-size: 13.5px;
  color: var(--ink-2);
}

.u-demo {
  margin-top: auto;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(52, 211, 153, 0.05);
  border: 1px dashed rgba(52, 211, 153, 0.3);
}

.u-demo-label {
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--accent-3);
  margin-bottom: 8px;
}

.u-demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.u-demo-row span {
  color: var(--ink-3);
  flex-shrink: 0;
  width: 92px;
}

.u-demo-row code {
  font-family: var(--font-mono);
  color: var(--moon);
  word-break: break-all;
}
</style>
