/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 11:37:49
 * @Description :
 */
import CoreRender from '@/core'
import { PAGE_MODE } from '@/constants/work'
import LbpBackground from '@/plugins/components/lbp-background'

class Page {
  constructor ({
    title = '',
    elements = [],
    height = PAGE_MODE.HEIGHT,
    width = PAGE_MODE.WIDTH,
    pageMode = PAGE_MODE.SWIPPER_PAGE
  } = {}) {
    this.uuid = +new Date()
    this.title = title
    this.width = width >= 0 ? width : PAGE_MODE.WIDTH
    this.height = height >= 0 ? height : PAGE_MODE.HEIGHT
    this.pageMode = pageMode
    this.elements = this.genElements(elements)
  }

  clone () {
    const elements = this.elements.map(
      element => new CoreRender.Element(element)
    )
    return new Page({ title: this.title, elements })
  }

  genElements (elements = []) {
    return Array.isArray(elements) && elements.length > 0
      ? elements.map(v => new CoreRender.Element(v))
      : [new CoreRender.Element({ name: LbpBackground.name })]
  }
}

export default Page
