<?php
require_once("config.php"); 
class JSSDK {
  private $appId;//只能内部访问的变量
  private $appSecret;
  
  //构造函数  对类里面的变量 进行初始化
  public function __construct($appId, $appSecret,$url) {
    $this->appId = $appId;
    $this->appSecret = $appSecret;
		$this->appUrl = $url;
  }
  
  //获取签名信息
  public function getSignPackage() {
  	//调用了 生成 ticket的函数
    $jsapiTicket = $this->getJsApiTicket();
    $url = "http://$_SERVER[HTTP_HOST]";
    //echo  $url;
    $url = $url."/".$this->appUrl;//调用微信接口的页面
	  //echo $url;
    $timestamp = time();//组织config内容时的时间戳
    $nonceStr = $this->createNonceStr();//生成签名的随机串
   // echo $nonceStr;
    // 这里参数的顺序要按照 key 值 ASCII 码升序排序
    $string = "jsapi_ticket=$jsapiTicket&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);//加密 
    $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string
    );
    return $signPackage; 
  }
  
  //生成随机串的函数
  private function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }
  
  // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
  private function getJsApiTicket() {
    //json_decode 将json转数组
    //file_get_contents  从文件中获取内容
    $data = json_decode(file_get_contents("jsapi_ticket.json"));
    //file_get_contents 将文件中的 数据读取出来
    //将json数据转成数组
    if ($data->expire_time < time()) {// time() 当前时间的时间戳    满足条件表示ticket过期 ，获取新的ticket
      $accessToken = $this->getAccessToken();//获取token
      $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
      $res = json_decode(file_get_contents($url));
      $ticket = $res->ticket;
      if ($ticket) {
        $data->expire_time = time() + 7000;
        $data->jsapi_ticket = $ticket;
        $fp = fopen("jsapi_ticket.json", "w");//打开某个文件
        fwrite($fp, json_encode($data));//将数据写入文件
        fclose($fp);//关闭文件
      }
    } else {
      $ticket = $data->jsapi_ticket;
    }
    return $ticket;
  }
  
  // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
  private function getAccessToken() {
    
    $data = json_decode(file_get_contents("access_token.json"));
	  //echo $data->expire_time.'^^'.time();
    if ($data->expire_time < time()) {//true  表示 token过期了，获取新的token
      $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$this->appId&secret=$this->appSecret";
      $res =  json_decode(file_get_contents($url));
	  	//print_r($res);
      $access_token = $res->access_token;
      if ($access_token) {
        $data->expire_time = time() + 7000;//在目前的事件戳上增加7000秒
        $data->access_token = $access_token;
        $fp = fopen("access_token.json", "w");//打开文件
        fwrite($fp, json_encode($data));//将数据写入 文件中
        fclose($fp);//关闭文件
      }
    } else {//false  token没过期
      $access_token = $data->access_token;
    }
    return $access_token;
  }
  
  private function httpGet($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 500);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_URL, $url);
    $res = curl_exec($curl);
    curl_close($curl);
    return $res;
  }
}