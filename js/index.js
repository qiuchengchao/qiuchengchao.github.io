function times(){
var today= new Date();
var hh= today.getHours();
var mm= today.getMinutes();
var ss= today.getSeconds();
if(mm<10)
	{
         mm="0"+mm;
    }
if(ss<10)
	{
         ss="0"+ss;
    }
document.getElementById("time").innerHTML=hh+":"+mm+":"+ss;
var time=setTimeout("times()",1000);
}
times();