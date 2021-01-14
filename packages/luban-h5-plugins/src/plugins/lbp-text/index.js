/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 14:44:11
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-text.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: luban-h5 text component/plugin
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import PropTypes from '../../PropTypes'
import './text-overwrite-quil-snow-theme.scss'
// https://github.com/luban-h5-components/plugin-common-props

export default {
  render (h) {
    const style = {
      position: 'relative',
      color: `${this.color} !important`,
      textDecoration: 'none',
      backgroundColor: this.backgroundColor || 'rgba(255, 255, 255, 0.2)',
      lineHeight: `${this.lineHeight}em`,
      border: `${this.borderWidth}px solid ${this.borderColor}`,
      borderRadius: `${this.borderRadius}px`
    }
    /**
     * https://github.com/ly525/luban-h5/issues/155
     * 需要给预览模式的文字添加 ql-snow 样式原因：文字样式和文字编辑器(ql-editor)的 theme 有关系
     * 比如编辑模式 h1 样式为：.ql-snow .ql-editor h1 {font-size: 2em;}
     * 因此预览模式的文字内容也需要加上 div.ql-snow > div.ql-editor 作为wrapper
     */
    return (
      <div
        onDblclick={e => {
          this.canEdit = true
          e.stopPropagation()
        }}
        onMousedown={e => {
          if (this.canEdit) { e.stopPropagation() }
        }}
        style={style}
        onKeydown={event => {
          const key = event.keyCode || event.charCode
          // #!en: backspace/delete key should only delete letter in textarea, do not delete element in canvas
          // #!zh: 键盘删除，应该只删除文字组件里面的文字，而不是删除画布上的元素
          if (key === 8 || key === 46) {
            event.stopPropagation()
          }
        }}
      >
      </div>
    )
  },
  name: 'lbp-text',
  data () {
    return {
      canEdit: false,
      innerText: this.text || '双击修改文字'
    }
  },
  props: {
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: 'rgba(0, 0, 0, 0)' }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 0 }),
    borderRadius: PropTypes.number({ label: '圆角(px)' }),
    borderColor: PropTypes.color({ label: '边框颜色' }),
    text: PropTypes.string({ label: '内容', defaultValue: '双击修改文字', visible: false }),
    editorMode: PropTypes.string({
      defaultValue: 'preview', // 可选值: preview/edit
      label: '模式',
      visible: false
    })
  },
  editorConfig: {
  }
}
