这是一个免费开源的jQuery插件

主要是实现table表格在手机等移动终端设备中优化显示问题

因为这些设备的屏幕较小，超过一定长度的table就需要拉动滚动条来显示，很不方便，
该插件就是实现每行显示指定的几列数据，点击该列后纵列显示该行数据。

同时，该插件支持跨行跨列。


该插件，需要配置的参数有：

1.可对指定class的table进行优化

table_mobile.table_class = 'mainTable';

2.指定由此属性的table忽略优化，

table_mobile.table_ignore = 'mobile_ignore';

3.有此属性的th列，将在优化后显示，只在head的第一行设置生效，默认显示table的前两列

table_mobile.table_show_th = 'mobile_th';

4.默认显示前几列的数据

table_mobile.table_show_th_auto = 2;

5.临时添加的列class值，插件在优化中自动添加td适合的class值（基本可不用理会）

table_mobile.table_temp_td = "mobile_td";


</table>

下面地址有详细描述：
http://liubiao4123.sinaapp.com/table_mobile.html