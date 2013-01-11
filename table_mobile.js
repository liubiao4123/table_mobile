/**
 * 需要jquery框架支持，支持跨行跨列的表头
 */
var table_mobile = {};

/**
 * class为此属性值的table将进行优化处理
 */
table_mobile.table_class = 'mainTable';

/**
 * 有此属性的table将忽略优化
 */
table_mobile.table_ignore = 'mobile_ignore';

/**
 * 有此属性的th列，将在优化后显示，只在head的第一行设置生效，默认显示table的前两列
 */
table_mobile.table_show_th = 'mobile_th';

/**
 * 默认显示前几列的数据
 */
table_mobile.table_show_th_auto = 2;

/**
 * 临时添加的列class值
 */
table_mobile.table_temp_td = "mobile_td";

//判断浏览器，是否为移动终端
table_mobile.mobile_check = function()
{
	var result = 0;
	var u = navigator.userAgent;
	//iphone移动终端
	var reg = new RegExp("(iPhone)");
	if ( reg.test(u) ) result = 1;
	
	if ( !result )
	{
		//android移动终端
		var reg_android = new RegExp("Android");
		if ( reg_android.test(u) ) result = 1;
	}
	
	if (result) table_mobile.mobile_deal();
}

//移动终端相关处理
table_mobile.mobile_deal = function()
{
	$("."+table_mobile.table_class).each(function(){
		var table = this;
		if ( typeof $(table).attr(table_mobile.table_ignore) != "undefined") return;
		
		
		var show_th = [];
		var show_td = [];
		var head_tr1_colspan = [];
		var head_rowspan = 1;
		var head_tr1_th = $($(table).find('tr')[0]).children('th,td');
		if (head_tr1_th.length < 5) return;
		
		for ( var j=0;j< head_tr1_th.length;j++ )
		{
			if ( typeof $(head_tr1_th[j]).attr(table_mobile.table_show_th) != "undefined" || j < parseInt(table_mobile.table_show_th_auto) )
			{
				show_th[j] = 1;
				head_rowspan = Math.max( head_rowspan,$(head_tr1_th[j]).attr('rowspan')?$(head_tr1_th[j]).attr('rowspan'):1 );
			}
			else
			{
				show_th[j] = 0;
				$(head_tr1_th[j]).css('display','none');
			}
			head_tr1_colspan[j] = $(head_tr1_th[j]).attr('colspan')>1?$(head_tr1_th[j]).attr('colspan'):1;
		}
		$($(table).find('tr')[0].insertCell(-1)).attr('rowspan',head_rowspan);
		show_td = show_th;
		
		//表头处理
		if ( head_rowspan > 1 )
		{
			show_td = [];
			for ( var t=1;t<head_rowspan;t++ )
			{
				var row_tr = $(table).find("tr")[t];
				var row_th = $(row_tr).children('th,td');
				for ( var p=0;p< row_th.length;p++ ) $(row_th[p]).css('display','none');
			}
			for ( var m=0;m<show_th.length;m++)
			{
				if ( !show_th[m] ) continue;
				var colspan = $(head_tr1_th[m]).attr('colspan')?$(head_tr1_th[m]).attr('colspan'):1;
				if ( colspan > 1 )
				{
					var num = head_rowspan - ($(head_tr1_th[m]).attr('rowspan')?$(head_tr1_th[m]).attr('rowspan'):1);
					for ( var n=1;n<=num;n++ )
					{
						var the_tr = $(table).find("tr")[n];
						var the_th = $(the_tr).children('th,td');
						var a = 0,b = 0;
						for (var st=0;st<m;st++)
						{
							if ( parseInt(head_tr1_colspan[st]) == 1 ) a++;
							else b += parseInt(head_tr1_colspan[st]);
						}
						for ( var y=0;y<colspan;y++ )
						{
							$(the_th[y+b]).css('display','');
							if (n == num) show_td[y+b+a] = 1;
						}
					}
				}
				else
				{
					var a = 0;
					for (var st=0;st<m;st++) a += parseInt(head_tr1_colspan[st]);
					show_td[a] = 1;
				}
			}
		}
		
		//表体处理
		for ( var i=head_rowspan; i< $(table).find("tr").length;i++ )
		{
			var tr = $(table).find("tr")[i];
			//防止table里内嵌table
			if ( tr.parentNode.parentNode !== table ) continue;
			
			for (var k=0;k<($(tr).children('td,th')).length;k++)
			{
				var td=$(tr).children('td,th');
				if ( td[k].parentNode.parentNode.parentNode !== table ) continue;
				var row_num = $(td[k]).attr('rowspan')?$(td[k]).attr('rowspan'):1;
				var col_num = $(td[k]).attr('colspan')?$(td[k]).attr('colspan'):1;
				if ( row_num > 1 )
				{
					$(td[k]).attr('rowspan',1);
					for (var t=1;t<row_num;t++)
					{				
						$($($(table).find("tr")[i+t]).children('td,th')[k]).before(td[k].tagName=='TD'?("<td>"+$(td[k]).html()+"</td>"):("<th>"+$(td[k]).html()+"</th>"));					
					}
				}
				if ( col_num > 1 )
				{
					$(td[k]).attr('colspan',1);
					for ( var t=1;t<col_num;t++ )
					{
						$($(tr).children('td,th')[k+t-1]).after(td[K].tagName=='TD'?("<td>"+$(td[k]).html()+"</td>"):("<th>"+$(td[k]).html()+"</th>"));
					}
				}
				if ( !show_td[k] ) $(td[k]).css('display','none');
			}
			var new_td = tr.insertCell(-1);
			new_td.className = table_mobile.table_temp_td;
			$(tr).bind('click',function(){table_mobile.mobile_detail(this.childNodes[this.childNodes.length-1].childNodes[0]);});
			$(new_td).html("<input type='button' onclick='event.cancelBubble=true;table_mobile.mobile_detail(this);' style='height: 33px;width: 82px;' value='详细' />");
		}
	});
}

//查看一行详细数据链接
table_mobile.mobile_detail = function(obj)
{
	var table = obj.parentNode.parentNode.parentNode.parentNode;
	var reg = new RegExp("("+table_mobile.table_class+")");
	if ( !reg.test( $(table).attr('class') ) )
	{
		alert('未找到table');return;
	}
	$(table).css('display','none');
	
	//获取table的head部分
	var table_head = [];
	var head_tr_colspan = [];
	var head_tr1_th = $($(table).find("tr")[0]).children('th,td');
	var head_row = 1;
	for ( var i=0;i<head_tr1_th.length;i++ )
	{
		head_row = Math.max( head_row,$(head_tr1_th[i]).attr('rowspan')?$(head_tr1_th[i]).attr('rowspan'):1 );
	}
	
	for ( var j=0;j<head_row;j++ )
	{
		if ( !(head_tr_colspan[j] instanceof Array) ) head_tr_colspan[j] = [];	
		var th = $($(table).find("tr")[j]).children('th,td');
		
		for ( var t=0;t< th.length;t++)
		{
			var colspan = $(th[t]).attr('colspan')?$(th[t]).attr('colspan'):1;
			var rowspan = $(th[t]).attr('rowspan')?$(th[t]).attr('rowspan'):1;
			var line = 0;
			if ( j == 0 )
			{
				for ( var col_i in head_tr_colspan[j] )
				{
					line += parseInt(head_tr_colspan[j][col_i]);
				}
			}
			else
			{
				var the_col = 0;
				for ( k=0;k<=t;k++)
				{
					the_col += parseInt($(th[k]).attr('colspan')?$(th[k]).attr('colspan'):1);
				}
				
				var num=0;
				for ( var col_i in head_tr_colspan[j-1] )
				{
					if ( parseInt(head_tr_colspan[j-1][col_i]) > 1 ) num += parseInt(head_tr_colspan[j-1][col_i]);
					line += Math.abs(parseInt(head_tr_colspan[j-1][col_i]));
					if ( the_col <= num ) 
					{
						line -= num;
						for ( var col_i_1 in head_tr_colspan[j])
						{
							if ( parseInt(head_tr_colspan[j][col_i_1]) > 0 ) line += parseInt(head_tr_colspan[j][col_i_1]);
						}
						break;
					}
				}
			}
			head_tr_colspan[j][line] = colspan;
			
			for ( var row_i = 1; row_i<rowspan;row_i++ )
			{
				if ( !(head_tr_colspan[j+row_i] instanceof Array) ) head_tr_colspan[j+row_i] = [];
				head_tr_colspan[j+row_i][line] = parseInt(colspan)*(-1);
			}
			
			if ( !table_head[line] ) table_head[line] = '';
			table_head[line] += "<th style='text-align:right;width:"+parseInt(document.body.clientWidth/2/parseInt(head_row)*parseInt(rowspan))+"px;' class='td1' rowspan="+colspan+" colspan="+rowspan+" >"+$(th[t]).html()+"</th>";								
		}
	}
	
	var mobile_detail = "<div style='position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;z-index:10010;background:white;'><table class='"+table_mobile.table_class+" mobile_detail'><tr onclick='table_mobile.mobile_return_click(this.childNodes[0].childNodes[0]);'><td colspan="+(parseInt(head_row)+1)+" align='center'><input type='button' style='height: 33px;width: 82px;' onclick='event.cancelBubble=true;table_mobile.mobile_return_click(this)' value='返回'/></td></tr>";
	
	for (var i=0;i<$(obj.parentNode.parentNode).children('td,th').length;i++)
	{
		var current = $(obj.parentNode.parentNode).children('td,th')[i];
		if ( $(current).attr('class') == table_mobile.table_temp_td ) continue;
		mobile_detail += "<tr>"+table_head[i]+"<td style='background:white;width:"+parseInt(document.body.clientWidth/2)+"'>"+$(current).html()+"</td></tr>";
	}
	
	mobile_detail += "<tr onclick='table_mobile.mobile_return_click(this.childNodes[0].childNodes[0]);'><td colspan="+(parseInt(head_row)+1)+" align='center'><input type='button' style='height: 33px;width: 82px;;' onclick='event.cancelBubble=true;table_mobile.mobile_return_click(this)' value='返回'/></td></tr></table></div>";
	$(table).after(mobile_detail);	
}

//查看详细之后的返回
table_mobile.mobile_return_click = function(obj)
{
	var table = obj.parentNode.parentNode.parentNode.parentNode;
	if ( !$(table).hasClass("mobile_detail") )
	{
		alert('未找到table');return;
	}
	$(table.parentNode).prev().css('display','');
	$(table.parentNode).remove();
}

$(function(){
	//执行
	table_mobile.mobile_check();
});

