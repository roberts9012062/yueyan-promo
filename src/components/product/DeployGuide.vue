<script setup lang="ts">
// 部署方法：终端风格代码块 + 一键复制 + 注意事项
import { ref } from 'vue';
import type { CodeBlock } from '../../types';

const props = defineProps<{
  blocks: readonly CodeBlock[];
  note: string;
  productId: string;
}>();

/** 当前已复制的代码块序号（用于按钮态反馈） */
const copiedIndex = ref<number | null>(null);

const copyBlock = async (index: number): Promise<void> => {
  const block: CodeBlock = props.blocks[index];
  try {
    await navigator.clipboard.writeText(block.code);
    copiedIndex.value = index;
    window.setTimeout((): void => {
      if (copiedIndex.value === index) {
        copiedIndex.value = null;
      }
    }, 1600);
  } catch {
    // 剪贴板不可用（非安全上下文）时静默降级：用户可手动选择复制
    copiedIndex.value = null;
  }
};
</script>

<template>
  <div class="deploy">
    <h3 class="d-title">🚀 部署方法</h3>
    <div v-for="(block, index) in blocks" :key="block.label" class="code-block">
      <div class="code-head">
        <span class="dot" style="background: #ff5f57" />
        <span class="dot" style="background: #febc2e" />
        <span class="dot" style="background: #28c840" />
        <span class="code-label">{{ block.label }}</span>
        <button class="copy" type="button" @click="copyBlock(index)">
          {{ copiedIndex === index ? '已复制 ✓' : '复制' }}
        </button>
      </div>
      <pre><code>{{ block.code }}</code></pre>
    </div>
    <p class="d-note">💡 {{ note }}</p>
  </div>
</template>

<style scoped>
.d-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 18px;
}

.deploy {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.d-title {
  margin-bottom: 0;
}

.copy {
  margin-left: auto;
  padding: 4px 12px;
  font-size: 12px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  transition: color 0.2s, border-color 0.2s;
}

.copy:hover {
  color: var(--accent);
  border-color: rgba(125, 211, 252, 0.5);
}

.d-note {
  font-size: 13px;
  color: var(--ink-3);
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(253, 230, 138, 0.05);
  border: 1px dashed rgba(253, 230, 138, 0.22);
  line-height: 1.65;
}
</style>
