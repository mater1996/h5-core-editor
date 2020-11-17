/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-17 17:38:15
 * @Description :
 */
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'

import '@/styles/index.scss'
import '@/plugins'
import i18n from '@/locales'

import LbpCanvas from './components/lbp-canvas'
import FixedTools from './components/fixed-tools/index'
import EditorRightPanel from './components/right-panel'
import EditorLeftPanel from './components/left-panel'
import AuxiliayLine from './components/AuxiliayLine'
import AdjustHeight from './components/AdjustHeight'
import AdjustLineV from './components/adjust-line/vertical'
import LbpWork from './models/LbpWork'
import LbpPage from './models/LbpPage'
import LbpElement from './models/LbpElement'
import config from './config'

const Editor = {
  name: 'lbp-editor',
  i18n,
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data: () => ({
    work: {},
    pageIndex: 0,
    activeElement: null,
    auxiliayVisible: false,
    rightPanelWidth: config.rightPanelWidth
  }),
  computed: {
    currentPage () {
      const { pages = [] } = this.work
      const currentPage = pages[this.pageIndex] || {}
      return currentPage
    },
    elementsRect () {
      const { currentPage = {} } = this
      const { elements = [] } = currentPage
      return elements.map(({ style }) => style)
    }
  },
  watch: {
    data: {
      handler (data = {}) {
        this.work = new LbpWork(data)
        console.log(this.work)
      },
      immediate: true
    },
    currentPage (currentPage = {}) {
      const { elements = [] } = currentPage
      this.clear()
      this.addElements(...elements)
    }
  },
  methods: {
    getData () {
      return this.work
    },
    addPage (title) {
      this.work.pages.push(new LbpPage({ title }))
    },
    changePageIndex (index) {
      this.pageIndex = index
    },
    updatePage (data) {
      Object.assign(this.currentPage, data)
    },
    addElements (...element) {
      element.forEach(this.addElement)
    },
    addElement (element) {
      if (element instanceof LbpElement) {
        this.currentPage.elements.push(element)
      } else {
        const lbpElement = new LbpElement(element)
        this.currentPage.elements.push(lbpElement)
      }
    },
    updateElement (data) {
      this.activeElement && this.activeElement.update(data)
    },
    clear () {
      this.currentPage.elements = []
    },
    _hideAuxiliay () {
      this.auxiliayVisible = false
    },
    _showAuxiliay () {
      this.auxiliayVisible = true
    },
    _handleElementActive (element) {
      this.activeElement = element
    },
    _handleElementDeactive (deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
    },
    _handleAdjustLieMove (offset) {
      this.rightPanelWidth += offset
    },
    _handlePropsChange (value) {
      this.updateElement({ props: value })
    },
    _handleAnimationsChange (value) {
      this.updateElement({ animations: value })
    },
    _handleElementRectChange (value) {
      this.updateElement({ style: value })
    },
    _handleAddElement (data) {
      this.addElement(data)
    },
    _handleAddPage (data) {
      this.addPage(data)
    },
    _handlePageHeightChange (height) {
      this.updatePage({ height })
    },
    _handlePageIndexChange (index) {
      this.changePageIndex(index)
    }
  },
  render () {
    return (
      <a-layout style={{ height: '100%' }}>
        <EditorLeftPanel
          pages={this.work.pages}
          onPageChange={this._handlePageIndexChange}
          onAddElement={this._handleAddElement}
          onAddPage={this._handleAddPage}
        />
        <a-layout id="editor-wrapper">
          <a-layout-content class="scroll-view remove-scrollbar">
            <div
              class="editor-content"
              onMousedown={this._showAuxiliay}
              onMouseup={this._hideAuxiliay}
            >
              <AuxiliayLine
                data={this.elementsRect}
                width={this.currentPage.width}
                height={this.currentPage.height}
                v-show={this.auxiliayVisible}
              />
              <LbpCanvas
                width={this.currentPage.width}
                height={this.currentPage.height}
                elements={this.currentPage.elements}
                onActive={this._handleElementActive}
                onDeactive={this._handleElementDeactive}
                onElementRectChange={this._handleElementRectChange}
              />
              <AdjustHeight
                height={this.currentPage.height}
                onChange={this._handlePageHeightChange}
              />
            </div>
          </a-layout-content>
        </a-layout>
        <AdjustLineV onLineMove={this._handleAdjustLieMove} />
        <FixedTools />
        <EditorRightPanel
          width={this.rightPanelWidth}
          element={this.activeElement}
          onPropsChange={this._handlePropsChange}
          onAnimationsChange={this._handleAnimationsChange}
        />
      </a-layout>
    )
  }
}

export default Editor
