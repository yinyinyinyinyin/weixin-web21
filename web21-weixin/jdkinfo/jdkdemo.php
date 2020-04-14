<?php
	require_once("config.php"); //调用 config.php 文件一次
	include('jssdk.php');//调用 jssdk.php文件
	//date_default_timezone_set('Asia/Beijing');
	//ini_set('date.timezone','Asia/Beijing');//设置时区
	$appUrl = $_GET['appUrl'];//需要接收js的某个get参数
	//print_r($appUrl);
    $jssdk = new JSSDK(APP_ID, APP_SECRET,$appUrl);//声明了一个类
    $signPackage = $jssdk->GetSignPackage(); 
	//print_r($signPackage);//打印数组
	//exit;//设置的结束 
	$result=json_encode($signPackage); //数组转json数据
	echo  $result;
	exit;
?>