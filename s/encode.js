var Base64={kunci:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(kata){
		var output="";
		var letak1,letak2,letak3,kode1,kode2,kode3,kode4;
		var i=0;
		kata=Base64.masukan(kata);
		while(i<kata.length){
			letak1=kata.charCodeAt(i++);
			letak2=kata.charCodeAt(i++);
			letak3=kata.charCodeAt(i++);
			kode1=letak1>>2;
			kode2=((letak1&3)<<4)|(letak2>>4);
			kode3=((letak2&15)<<2)|(letak3>>6);
			kode4=letak3&63;
			if(isNaN(letak2)){
				kode3=kode4=64;
			}else if(isNaN(letak3)){
				kode4=64;
			}
			output=output+ this.kunci.charAt(kode1)+ this.kunci.charAt(kode2)+ this.kunci.charAt(kode3)+ this.kunci.charAt(kode4);
		}
	return output;
	},decode:function(kata){
		var output="";
		var letak1,letak2,letak3;
		var kode1,kode2,kode3,kode4;
		var i=0;
		kata=kata.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		while(i<kata.length){
			kode1=this.kunci.indexOf(kata.charAt(i++));
			kode2=this.kunci.indexOf(kata.charAt(i++));
			kode3=this.kunci.indexOf(kata.charAt(i++));
			kode4=this.kunci.indexOf(kata.charAt(i++));
			letak1=(kode1<<2)|(kode2>>4);
			letak2=((kode2&15)<<4)|(kode3>>2);
			letak3=((kode3&3)<<6)|kode4;
			output=output+ String.fromCharCode(letak1);
			if(kode3!=64){
				output=output+ String.fromCharCode(letak2);
			}
			if(kode4!=64){
				output=output+ String.fromCharCode(letak3);
			}
		}
		output=Base64.keluarkan(output);
		return output;
	},masukan:function(string){
		string=string.replace(/\r\n/g,"\n");
		var utftext="";
		for(var n=0;n<string.length;n++){
			var c=string.charCodeAt(n);
			if(c<128){
				utftext+=String.fromCharCode(c);
			}else if((c>127)&&(c<2048)){
				utftext+=String.fromCharCode((c>>6)|192);
				utftext+=String.fromCharCode((c&63)|128);
			}else{
				utftext+=String.fromCharCode((c>>12)|224);
				utftext+=String.fromCharCode(((c>>6)&63)|128);
				utftext+=String.fromCharCode((c&63)|128);
			}
		}
		return utftext;
	},keluarkan:function(utftext){
		var string="";
		var i=0;
		var c=c1=c2=0;
		while(i<utftext.length){
			c=utftext.charCodeAt(i);
			if(c<128){
				string+=String.fromCharCode(c);
				i++;
			}else if((c>191)&&(c<224)){
				c2=utftext.charCodeAt(i+ 1);
				string+=String.fromCharCode(((c&31)<<6)|(c2&63));
				i+=2;
			}else{
				c2=utftext.charCodeAt(i+ 1);
				c3=utftext.charCodeAt(i+ 2);
				string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
				i+=3;
			}
		}
		return string;
	}
}

var encode=document.getElementById('encode'),decode=document.getElementById('decode'),output=document.getElementById('output'),kata=document.getElementById('kata');
var User_ID="";
var protected_links="";
var a_to_va=0;
var a_to_vb=0;
var a_to_vc="";

function auto_safelink(){
	auto_safeconvert();
}

function auto_safeconvert(){
	var a_to_vd=window.location.hostname;
	if(protected_links!=""&&!protected_links.match(a_to_vd)){
		protected_links+=", "+ a_to_vd;
	}else if(protected_links==""){
		protected_links=a_to_vd;
	}
	
	var a_to_ve="";
	var a_to_vf=new Array();
	var a_to_vg=0;
	a_to_ve=document.getElementsByTagName("a");
	a_to_va=a_to_ve.length;
	a_to_vf=a_to_fa();
	a_to_vg=a_to_vf.length;
	var a_to_vh=false;
	var j=0;
	var a_to_vi="";

	for(var i=0;i<a_to_va;i++){
		a_to_vh=false;
		j=0;
		while(a_to_vh==false&&j<a_to_vg){
			a_to_vi=a_to_ve[i].href;
			if(a_to_vi.match(a_to_vf[j])||!a_to_vi||!a_to_vi.match("http")){
				a_to_vh=true;
			}
			j++;
		}
		if(a_to_vh==false){
			var koderyptedUrl=Base64.encode(a_to_vi);
			a_to_ve[i].href="http://i.gtaind.com/?"+ koderyptedUrl;
			a_to_ve[i].rel="nofollow";
			a_to_vb++;
			a_to_vc+=i+":::"+ a_to_ve[i].href+"\n";
		}
	}

	var a_to_vj=document.getElementById("anonyminized");
	var a_to_vk=document.getElementById("found_links");
	if(a_to_vj){
		a_to_vj.innerHTML+=a_to_vb;
	}
	if(a_to_vk){
		a_to_vk.innerHTML+=a_to_va;
	}
}

function a_to_fa(){
	var a_to_vf=new Array();
	protected_links=protected_links.replace(" ","");
	a_to_vf=protected_links.split(",");
	return a_to_vf;}
