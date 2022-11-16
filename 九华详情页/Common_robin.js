/* THIS FILE IS PART OF Robin
# Common_robin.js - The js of Common js
# Copyright (c) 2022 Robin
*/
//初始部分开始
//点定义屏幕宽度
var dc_width = $(document).width();

//定义首页路径
var hm_path = location.pathname;

//给main添加id
$('.main').attr('id','jb');
//根据屏幕宽度来添加类名，以便移动端样式和pc端区分开来
if(dc_width < 768){
	$('.main').addClass('mob');
}else{
	$('.main').addClass('pc');
}

//根据路径判断是否是首页
if(hm_path === '/Home.html'){
	$('.main').addClass('home');
}else{
	$('.main').addClass('inpage');
}
//初始部分结束