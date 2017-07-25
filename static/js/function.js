

//Global variables
var Points;
var Prikols;
var Jg_doc;
var TeamArray;
var CurrentTime;
var CurrItemArray = new Array();
var interval;
var pauseFlag = false;
//Classes
function Point(x,y){
	this.x = x;
	this.y = y;
}

function Team(teamName){
	this.CPArray;
	this.teamName = teamName;
	this.CurItem=0;
	this.GetFullInterval = function(){
		if(this.CPArray!=null && this.CPArray.length>0)
			return getDateMS(this.CPArray[this.CPArray.length -1].curTime) - getDateMS(this.CPArray[0].curTime);
		return 0;	
	} 	
}

function Run(){
	TeamArray = parseTables();
	for(var i=0; i<TeamArray.length;i++){
		CurrItemArray[TeamArray[i].teamName] = 0;
	}
	interval = setInterval('drawTeam()',1);
}
function play(){
	if(pauseFlag){
		pauseFlag= false;	
	}
	else{
	     initAll("map_panel");
	}
	Run();
}
function pause(){
	if(interval){
		pauseFlag = true;
		window.clearInterval(interval);
		interval = null;
	}
}
function stop(){
	if(interval){
		window.clearInterval(interval);
		interval = null;
		Jg_doc.clear();
	}
	else if(pauseFlag){
		window.clearInterval(interval);
		interval = null;
		Jg_doc.clear();
		pauseFlag= false;
	}
}
function getSpeed(){
    switch(document.getElementById('obSpeed').selectedIndex){
    case 0:return 10000;
    case 1:return 30000;
    case 2:return 100000;
    default: break;
    }
}
function drawTeam(){ 
	CurrentTime += getSpeed();
	Jg_doc.clear();
	var ifEnd=0;
	for(var i=0; i<TeamArray.length;i++){
		var curItem = CurrItemArray[TeamArray[i].teamName];
		
		var secondTime = getDateMS(TeamArray[i].CPArray[curItem+1].curTime);
		
		if(secondTime<=CurrentTime){
		    
			curItem++;
			if (curItem >= TeamArray[i].CPArray.length - 1) {
				if(CurrentTime > getDateMS("17:20:00")){
					window.clearInterval(interval);
					interval = null;
				}
			    	continue;
			    
			}
			CurrItemArray[TeamArray[i].teamName] = curItem;
			secondTime=getDateMS(TeamArray[i].CPArray[curItem+1].curTime);	
			
		}
		var firstTime = getDateMS(TeamArray[i].CPArray[curItem].curTime);
		
		var first=Points[TeamArray[i].CPArray[curItem].cpName];
		var second=Points[TeamArray[i].CPArray[curItem+1].cpName];
		var resSec = CurrentTime - firstTime;
        
		var xTemp=first.x+Math.round(resSec*(second.x-first.x)/(secondTime - firstTime));
		var yTemp=first.y+Math.round(resSec*(second.y-first.y)/(secondTime - firstTime));
		
		myDrawFunction(xTemp,yTemp,TeamArray[i].teamName,TeamArray[i].CPArray[curItem].cpName,TeamArray[i].CPArray[curItem+1].cpName);       
	}
	 document.getElementById('timeDiv').innerHTML = getDatefromMS(CurrentTime);
}

function getDateMS(str) {
	var timesplit = str.split(':');
	return timesplit[2]*1000+timesplit[1]*60000+timesplit[0]*3600000; 
}


function getDatefromMS(ms) {
	var hour = Math.floor(ms/3600000);
	var min = Math.floor((ms - hour*3600000)/60000);
	var sec = Math.floor((ms - hour*3600000 - min*60000)/1000);
	var hourStr = hour.toString();
	if(hourStr.length == 1)
		hourStr = "0"+hourStr;
	var minStr = min.toString();
	if(minStr.length == 1)
		minStr = "0"+minStr;
	var secStr = sec.toString();
	if(secStr.length == 1)
		secStr = "0"+secStr;	
	return hourStr + ":" + minStr + ":" + secStr;
}


function myDrawFunction(x,y,teamName, cp1name, cp2name) {           
	
	var num = teamName.replace("team_","");
	Jg_doc.setColor('black');
	var numTeam = num;
	if(cp1name == cp2name && Prikols[cp2name] == num)
	    numTeam = "������ " + numTeam; 
	Jg_doc.drawString(numTeam, x+Math.floor(num/10), y+Math.floor(num/10));
	Jg_doc.paint();  
}

function CP(cpName, curTime){
	this.cpName = cpName;
	this.curTime = curTime;
}

//common functions
function initAll(panelID){
	Jg_doc = new jsGraphics(panelID);
	TeamArray = new Array();
	CurrentTime = getDateMS("09:30:00");
	_initPoints();
	_initPrikols();
}

function _initPoints(){
	Points = new Number();
	Points['�����'] = new Point(588,464);
	Points['�����'] = new Point(588,464);

	Points['��-�01'] = new Point(542,473);	
	Points['��-�02'] = new Point(82,432);
	Points['��-�03'] = new Point(208,24);
	Points['��-�04'] = new Point(143,650);
	Points['��-�05'] = new Point(31,298);	
	Points['��-�06'] = new Point(524,286);
	Points['��-�07'] = new Point(180,380);
	Points['��-�08'] = new Point(418,333);
	Points['��-�09'] = new Point(350,499);	
	Points['��-�10'] = new Point(483,613);
	Points['��-�11'] = new Point(339,659);
	Points['��-�12'] = new Point(442,263);
	Points['��-�13'] = new Point(273,103);

	Points['��-�01'] = new Point(203,247);	
	Points['��-�02'] = new Point(485,561);
	Points['��-�03'] = new Point(536,218);
	Points['��-�04'] = new Point(448,479);
	Points['��-�05'] = new Point(335,218);	
	Points['��-�06'] = new Point(165,186);
	Points['��-�07'] = new Point(556,363);
	Points['��-�08'] = new Point(107,47);
	Points['��-�09'] = new Point(329,50);	
	Points['��-�10'] = new Point(481,139);
	Points['��-�11'] = new Point(233,438);
	Points['��-�12'] = new Point(57,643);
	Points['��-�13'] = new Point(255,602);
	
	Points['��-��2'] = new Point(20,677);
	Points['��-��1'] = new Point(501,668);
	Points['��-��3'] = new Point(402,142);
	Points['��-��4'] = new Point(85,128);
}

function _initPrikols(){
    Prikols = new Number();
    Prikols['��-�01'] = 0;
    Prikols['��-�02'] = 63;
    Prikols['��-�03'] = 6;
    Prikols['��-�04'] = 17;
    Prikols['��-�05'] = 58;
    Prikols['��-�06'] = 44;
    Prikols['��-�07'] = 65;
    Prikols['��-�08'] = 59;
    Prikols['��-�09'] = 36;
    Prikols['��-�10'] = 56;
    Prikols['��-�11'] = 16;
    Prikols['��-�12'] = 44;
    Prikols['��-�13'] = 35;
    
    Prikols['��-�01'] = 0;
    Prikols['��-�02'] = 67;
    Prikols['��-�03'] = 61;
    Prikols['��-�04'] = 0;
    Prikols['��-�05'] = 20;
    Prikols['��-�06'] = 55;
    Prikols['��-�07'] = 54;
    Prikols['��-�08'] = 58;
    Prikols['��-�09'] = 48;
    Prikols['��-�10'] = 44;
    Prikols['��-�11'] = 65;
    Prikols['��-�12'] = 17;
    Prikols['��-�13'] = 17;
    
    Prikols['��-��2'] = 0;
	Prikols['��-��1'] = 0;
	Prikols['��-��3'] = 61;
	Prikols['��-��4'] = 48;
}

function parseTables(){
	mytable = document.getElementsByTagName("table");
	var curTeamArray = new Array();
	for (var i=0; i < mytable.length; i++){	
		if(mytable[i].id.indexOf("team")!=-1){
			var myrows = mytable[i].getElementsByTagName("tr");
			var curCP;
			var fl = 0;
			var curTeam = new Team(mytable[i].id);
			var curArray = new Array();
			for(var j=0;j<myrows.length;j++){
				var mycels = myrows[j].getElementsByTagName("td");
				for(var k=0;k<mycels.length;k++){
					switch(fl)
					{
					case 0:
					  curCP = new CP();
					  curCP.cpName = mycels[k].childNodes[0].data;
					  fl=1;
					  break;    
					case 1:	  
					  curCP.curTime = mycels[k].childNodes[0].data;
					  curArray.push(curCP);  
					  fl=0;
					  break;
					}
				}	
			}
			curTeam.CPArray = curArray;
			curTeamArray.push(curTeam);
		}
	}
	return curTeamArray;	
}


