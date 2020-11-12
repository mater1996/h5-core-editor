/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-12 16:39:37
 * @Description :
 */
import { Button, Input } from "ant-design-vue";

export default {
  components: {
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button
  },
  data: () => ({
    editorContent: `return {
      editorMethods: {              // 此项配置自定义方法的在组件配置面板如何展示
        projectJump1: {             // 方法名，对应于 methods 内的某方法
          label: '外部跳转1',        // 自定义方法显示名
          params: [                 // 参数列表，对象数组
            {
              label: '跳转地址',     // 参数1的名称
              desc: '项目相对地址',   // 参数1的描述
              type: 'string',       // 参数1的类型，支持string|number|boolean|array|object
              default: ''           // 参数1默认值
            },
            {
              label: '参数',
              desc: 'query形式参数',
              type: 'object',
              default: {}
            }
          ]
        }
      },
      methods:{
        projectJump1:function(url, query){
          console.log(url, query)
          let win = window.open(url, '_blank')
          win.focus()
        }
      }
    }`
  }),
  render(h) {
    const ele = null;
    if (!ele) return <span>{this.$t("editor.editPanel.common.empty")}</span>;
    return (
      <div>
        <a-button onClick={this.mixinScript} disabled>
          使用脚本
        </a-button>
        <div style={{ margin: "20px" }}></div>
        <a-textarea
          rows={12}
          placeholder="Basic usage"
          value={this.editorContent}
          onChange={e => {
            this.editorContent = e.target.value;
          }}
        />
      </div>
    );
  }
};
