/**
 * host 半区：本插件不需要宿主侧逻辑，也没有可配置项 —— 登记一个空插件即可。
 * 真正的样子全在浏览器半区（lib/client.js），它只往页面里注入一张样式表。
 */
export function apply() {}
