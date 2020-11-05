/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-04 15:09:20
 * @Description :
 */
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'

import '@/styles/index.scss'
import FixedTools from '@/editor/fixed-tools/index'
import EditorRightPanel from '@/editor/right-panel/index'
import EditorCanvas from '@/editor/canvas/index'
import EditorLeftPanel from '@/editor/left-panel/index'
import AdjustLineV from '@/support/adjust-line/vertical'
import store from '@/store/index'
import i18n from '@/locales/index'
import '@/plugins/index'

const CoreEditor = {
  name: 'CoreEditor',
  store,
  i18n,
  props: {
    work: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    [Layout.name]: Layout
  },
  watch: {
    work: {
      handler(newWork) {
        if (newWork) {
          console.log('work', newWork)
          this.$store.commit('editor/setWork', newWork)
          this.$store.commit('editor/setEditingPage')
        }
      },
      immediate: true
    }
  },
  data: () => ({
    previewDialogVisible: false,
    propsPanelWidth: 375
  }),
  methods: {
    handlePreview() {
      this.previewDialogVisible = true
    },
    getData() {
      return this.$store.state.editor.work
    }
  },
  render() {
    return (
      this.work.id && (
        <a-layout>
          <a-layout style={{ height: '100%' }}>
            <EditorLeftPanel />
            <EditorCanvas ref="editor" />
            <AdjustLineV
              onLineMove={offset => {
                this.propsPanelWidth += offset
              }}
            />
            <FixedTools />
            <EditorRightPanel width={this.propsPanelWidth} />
          </a-layout>
        </a-layout>
      )
    )
  }
}

// Vue install, Vue.use 会调用该方法。
CoreEditor.install = (Vue, opts = {}) => {
  Vue.component(CoreEditor.name, CoreEditor)
}

// 通过script标签引入Vue的环境
if (typeof window !== 'undefined' && window.Vue) {
  CoreEditor.install(window.Vue)
}

export default CoreEditor
