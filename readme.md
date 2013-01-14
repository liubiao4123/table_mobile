这是一个免费开源的jQuery插件

主要是实现table表格在手机等移动终端设备中优化显示问题

因为这些设备的屏幕较小，超过一定长度的table就需要拉动滚动条来显示，很不方便，
该插件就是实现每行显示指定的几列数据，点击该列后纵列显示该行数据。

同时，该插件支持跨行跨列。


该插件，需要配置的参数有：
/**
 * 可对指定class的table进行优化
 */
table_mobile.table_class = 'mainTable';

/**
 * 指定由此属性的table忽略优化，
 */
table_mobile.table_ignore = 'mobile_ignore';
如：<table mobile_ignore></table>

/**
 * 有此属性的th列，将在优化后显示，只在head的第一行设置生效，默认显示table的前两列
 */
table_mobile.table_show_th = 'mobile_th';
如：<tr><th mobile_th></th></tr>

/**
 * 默认显示前几列的数据
 */
table_mobile.table_show_th_auto = 2;

/**
 * 临时添加的列class值，插件在优化中自动添加td适合的class值（基本可不用理会）
 */
table_mobile.table_temp_td = "mobile_td";



下面是一个例子：
<table class="mainTable">
<tbody align=center>
    <tr>
        <th rowspan='2'>服务器</th>
        <th rowspan='2'>鱼饵品质</th>
        <th rowspan='2'>使用人数</th>
        <th rowspan='2'>使用次数</th>
        <th colspan='3' mobile_th>购买鱼饵消费</th>
        <th rowspan='2'>使用立即完成人数</th>
        <th rowspan='2'>使用立即完成次数</th>
        <th colspan="3">立即完成消费</th>
    </tr>
    <tr>
        <th>绑定元宝</th>
        <th>元宝;</th>
        <th>总计</th>
        <th>绑定元宝</th>
        <th>元宝</th>
        <th>总计</th>
    </tr>
</tbody>
</table>

下面地址有详细描述：
http://liubiao4123.sinaapp.com/table_mobile.html