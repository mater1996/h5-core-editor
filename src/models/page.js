/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-11 09:50:15
 * @Description :
 */
import Element from '@/models/element'
import { PAGE_MODE } from '@/constants/work'
import LbpBackground from '@/plugins/components/lbp-background'

class Page {
  constructor({
    uuid = +new Date(),
    title = '',
    elements = [],
    height = PAGE_MODE.HEIGHT,
    width = PAGE_MODE.WIDTH,
    page_mode = PAGE_MODE.SWIPPER_PAGE
  } = {}) {
    this.uuid = uuid
    this.title = title
    this.width = width >= 0 ? width : PAGE_MODE.WIDTH
    this.height = height >= 0 ? height : PAGE_MODE.HEIGHT
    this.page_mode = page_mode
    this.elements = this.genElements(elements)
  }

  clone() {
    const elements = this.elements.map(element => new Element(element))
    return new Page({ title: this.title, elements })
  }

  genElements(elements = []) {
    return Array.isArray(elements) && elements.length > 0
      ? elements.map(v => new Element(v))
      : [new Element(LbpBackground)]
  }
}

export default Page
