<template>
  <div class="overview">
    <yn-card title="关于">
      <div class="about">
        当前项目是基于 Vue3、Pinia、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等技术实现的一套较为完备的后台系统解决方案。
      </div>
    </yn-card>
    <yn-card title="技术栈">
      <yn-text-link :text-arrs="technologyStacks" />
      <yn-description
        title="生产环境依赖"
        :column="2"
        :table-data="devDependencies"
      />
      <yn-description
        title="开发环境依赖"
        :column="2"
        :table-data="dependencies"
      />
    </yn-card>
    <yn-card title="项目结构">
      <yn-code language="bash" :code="projectDir" />
    </yn-card>
    <yn-card title="项目规范">
      <yn-description
        title="文件命名规范"
        :column="1"
        :table-data="[
          { name: '文件夹', description: '统一小写，多个单词使用 - 分割' },
          {
            name: '文件(.ts .vue .json .d.ts)',
            description: '统一小写，多个单词使用 - 分割'
          }
        ]"
      />
      <yn-description
        title="编写组件规范"
        :column="1"
        :table-data="[
          {
            name: '组件的文件',
            description: '命名统一小写，多个单词使用 - 分割'
          },
          {
            name: '组件的目录结构',
            description:
              '例如 form 组件：form/src/form.vue，统一在 form/index.ts 导出'
          },
          {
            name: '组件导包顺序',
            description:
              '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
          },
          { name: '组件的名称', description: '统一大写开头，驼峰命名' },
          {
            name: 'template标签',
            description: '小写加 - ( 例如：<case-panel/> )'
          },
          {
            name: 'template标签属性顺序',
            description: 'v-if , v-for , ref, class, style, ... ,事件'
          },
          {
            name: '组件的props',
            description: '小写开头，驼峰命名，必须编写类型默认值'
          },
          {
            name: '组件的样式',
            description:
              '作用域：scoped, lang = less  ; 类名：统一小写, 多个单词使用 - 分割'
          }
        ]"
      />
    </yn-card>
    <yn-card title="Git提交规范">
      <yn-description
        :column="1"
        :table-data="[
          { name: 'add操作', description: 'git add' },
          { name: 'commit 操作', description: 'npm run commit ' },
          { name: 'pull 操作', description: 'git pull ' },
          { name: 'push 操作', description: 'git push ' }
        ]"
      />
    </yn-card>
  </div>
</template>

<script lang="ts" setup>
import YnCard from '@/base-ui/card'
import YnTextLink from '@/base-ui/text-link'
import YnDescription from '@/base-ui/description'
import YnCode from '@/base-ui/code'
import { technologyStacks } from './config'
import { devDependencies } from './config'
import { dependencies } from './config'
import { projectDir } from './config'
</script>

<style scoped></style>
