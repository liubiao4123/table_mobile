����һ����ѿ�Դ��jQuery���

��Ҫ��ʵ��table������ֻ����ƶ��ն��豸���Ż���ʾ����

��Ϊ��Щ�豸����Ļ��С������һ�����ȵ�table����Ҫ��������������ʾ���ܲ����㣬
�ò������ʵ��ÿ����ʾָ���ļ������ݣ�������к�������ʾ�������ݡ�

ͬʱ���ò��֧�ֿ��п��С�


�ò������Ҫ���õĲ����У�
/**
 * �ɶ�ָ��class��table�����Ż�
 */
table_mobile.table_class = 'mainTable';

/**
 * ָ���ɴ����Ե�table�����Ż���
 */
table_mobile.table_ignore = 'mobile_ignore';
�磺<table mobile_ignore></table>

/**
 * �д����Ե�th�У������Ż�����ʾ��ֻ��head�ĵ�һ��������Ч��Ĭ����ʾtable��ǰ����
 */
table_mobile.table_show_th = 'mobile_th';
�磺<tr><th mobile_th></th></tr>

/**
 * Ĭ����ʾǰ���е�����
 */
table_mobile.table_show_th_auto = 2;

/**
 * ��ʱ��ӵ���classֵ��������Ż����Զ����td�ʺϵ�classֵ�������ɲ�����ᣩ
 */
table_mobile.table_temp_td = "mobile_td";



������һ�����ӣ�
<table class="mainTable">
<tbody align=center>
    <tr>
        <th rowspan='2'>������</th>
        <th rowspan='2'>���Ʒ��</th>
        <th rowspan='2'>ʹ������</th>
        <th rowspan='2'>ʹ�ô���</th>
        <th colspan='3' mobile_th>�����������</th>
        <th rowspan='2'>ʹ�������������</th>
        <th rowspan='2'>ʹ��������ɴ���</th>
        <th colspan="3">�����������</th>
    </tr>
    <tr>
        <th>��Ԫ��</th>
        <th>Ԫ��;</th>
        <th>�ܼ�</th>
        <th>��Ԫ��</th>
        <th>Ԫ��</th>
        <th>�ܼ�</th>
    </tr>
</tbody>
</table>

�����ַ����ϸ������
http://liubiao4123.sinaapp.com/table_mobile.html