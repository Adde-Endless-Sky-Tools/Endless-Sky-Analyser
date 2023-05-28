var filter=`power`
var faction
var factionBreak=1
var regenerators=[]
var cooling=[]
var fuel=[]
var power=[]
var engines=[]
function initialize(){
	if(localStorage.getItem(`filter`))
		filter=localStorage.getItem(`filter`)
	filterCalculations()
}
function uploadFiles(that){
	document.querySelectorAll(`.blocked`).forEach((element)=>{
		element.classList.remove(`blocked`)
	})
	var files=event.target.files
	for(i1=0;i1<files.length;i1++){
		var systemsReader=new FileReader()
		systemsReader.readAsText(files[i1])
		systemsReader.onload=function(e){
			var output=e.target.result
			lines=output.split(`\n`)
			for(i2=0;i2<lines.length;i2++){
				//	Outfits
				if(/^outfit\s/.test(lines[i2])){
					regenerators.push([lines[i2].slice(7),[27],[],[],[],[],[],[],[],[],[],[]])
					cooling.push([lines[i2].slice(7),[27],[],[],[],[],[],[],[]])
					fuel.push([lines[i2].slice(7),[27],[],[],[],[],[],[]])
					power.push([lines[i2].slice(7),[27],[],[],[],[],[],[],[],[]])
					engines.push([lines[i2].slice(7),[27],[],[[],[]],[],[],[],[],[],[],[],[]])
					for(i3=i2+1;i3<lines.length;i3++){
						if(!/^\t/.test(lines[i3]))
							break
						if(/^\t"*category"*/.test(lines[i3])){
							regenerators[regenerators.length-1][2]=lines[i3].replaceAll(`"`,``).slice(10)
							cooling[cooling.length-1][2]=lines[i3].replaceAll(`"`,``).slice(10)
							fuel[cooling.length-1][2]=lines[i3].replaceAll(`"`,``).slice(10)
							power[power.length-1][2]=lines[i3].replaceAll(`"`,``).slice(10)
							engines[engines.length-1][2]=lines[i3].replaceAll(`"`,``).slice(10)
						}
						if(/^\t"*outfit space"*/.test(lines[i3])){
							regenerators[regenerators.length-1][3]=lines[i3].replaceAll(`"`,``).slice(14)
							cooling[cooling.length-1][3]=lines[i3].replaceAll(`"`,``).slice(14)
							fuel[cooling.length-1][3]=lines[i3].replaceAll(`"`,``).slice(14)
							power[power.length-1][3]=lines[i3].replaceAll(`"`,``).slice(14)
						}
						if(/^\t"*weapon capacity"*/.test(lines[i3]))
							engines[engines.length-1][3][1]=lines[i3].replaceAll(`"`,``).slice(17)
						if(/^\t"*engine capacity"*/.test(lines[i3]))
							engines[engines.length-1][3][0]=lines[i3].replaceAll(`"`,``).slice(17)
						if(factionLookupNumber.get(factionLookupString.get(regenerators[regenerators.length-1][0])))
							regenerators[regenerators.length-1][1]=factionLookupNumber.get(factionLookupString.get(regenerators[regenerators.length-1][0]))
						if(factionLookupNumber.get(factionLookupString.get(cooling[cooling.length-1][0])))
							cooling[cooling.length-1][1]=factionLookupNumber.get(factionLookupString.get(cooling[cooling.length-1][0]))
						if(factionLookupNumber.get(factionLookupString.get(fuel[fuel.length-1][0])))
							fuel[fuel.length-1][1]=factionLookupNumber.get(factionLookupString.get(fuel[fuel.length-1][0]))
						if(factionLookupNumber.get(factionLookupString.get(power[power.length-1][0])))
							power[power.length-1][1]=factionLookupNumber.get(factionLookupString.get(power[power.length-1][0]))
						if(factionLookupNumber.get(factionLookupString.get(engines[engines.length-1][0])))
							engines[engines.length-1][1]=factionLookupNumber.get(factionLookupString.get(engines[engines.length-1][0]))
						compileRegenerators()
						compileCooling()
						compileFuel()
						compilePower()
						compileEngines()
					}
				}
			}
		}
	}
	document.getElementById(`sortFactions`).classList.remove(`hidden`)
	setTimeout(sortFactions,1000)
}
function compileRegenerators(){
	if(/^\t"*shield generation"*/.test(lines[i3]))
		regenerators[regenerators.length-1][4]=lines[i3].replaceAll(`"`,``).slice(19)
	if(regenerators[regenerators.length-1][3].length&&regenerators[regenerators.length-1][4].length)
		regenerators[regenerators.length-1][5]=(regenerators[regenerators.length-1][4]/regenerators[regenerators.length-1][3])*-1
	if(/^\t"*shield energy"*/.test(lines[i3]))
		regenerators[regenerators.length-1][6]=lines[i3].replaceAll(`"`,``).slice(15)
	if(regenerators[regenerators.length-1][4].length&&regenerators[regenerators.length-1][6].length)
		regenerators[regenerators.length-1][7]=(regenerators[regenerators.length-1][4]/regenerators[regenerators.length-1][6])
	if(/^\t"*hull repair rate"*/.test(lines[i3]))
		regenerators[regenerators.length-1][8]=lines[i3].replaceAll(`"`,``).slice(18)
	if(regenerators[regenerators.length-1][3].length&&regenerators[regenerators.length-1][8].length)
		regenerators[regenerators.length-1][9]=(regenerators[regenerators.length-1][8]/regenerators[regenerators.length-1][3])*-1
	if(/^\t"*hull energy"*/.test(lines[i3]))
		regenerators[regenerators.length-1][10]=lines[i3].replaceAll(`"`,``).slice(13)
	if(regenerators[regenerators.length-1][10].length&&regenerators[regenerators.length-1][8].length)
		regenerators[regenerators.length-1][11]=(regenerators[regenerators.length-1][8]/regenerators[regenerators.length-1][10])
}
function compileCooling(){
	if(!/^\t"*cooling inefficiency"*/.test(lines[i3])&&!/^\t"*cooling energy"*/.test(lines[i3]))
		if(/^\t"*cooling"*/.test(lines[i3]))
			cooling[cooling.length-1][4]=lines[i3].replaceAll(`"`,``).slice(9)
	if(/^\t"*active cooling"*/.test(lines[i3]))
		cooling[cooling.length-1][5]=lines[i3].replaceAll(`"`,``).slice(16)
	if(cooling[cooling.length-1][3].length||cooling[cooling.length-1][4].length||cooling[cooling.length-1][5].length){
		cooling[cooling.length-1][6]=((+cooling[cooling.length-1][4]+ +cooling[cooling.length-1][5])/cooling[cooling.length-1][3])*-1
		if(cooling[cooling.length-1][6]==-Infinity)
			cooling[cooling.length-1][6]=cooling[cooling.length-1][6]*-1
	}
	if(/^\t"*cooling energy"*/.test(lines[i3]))
		cooling[cooling.length-1][7]=lines[i3].replaceAll(`"`,``).slice(16)
	if(cooling[cooling.length-1][5].length&&cooling[cooling.length-1][7].length)
		cooling[cooling.length-1][8]=cooling[cooling.length-1][5]/cooling[cooling.length-1][7]
}
function compileFuel(){
	if(/^\t"*fuel capacity"*/.test(lines[i3]))
		fuel[fuel.length-1][4]=lines[i3].replaceAll(`"`,``).slice(15)
	if(fuel[fuel.length-1][3].length&&fuel[fuel.length-1][4].length)
		fuel[fuel.length-1][5]=(fuel[fuel.length-1][4]/fuel[fuel.length-1][3])*-1
	if(/^\t"*ramscoop"*/.test(lines[i3]))
		fuel[fuel.length-1][6]=lines[i3].replaceAll(`"`,``).slice(10)
	if(fuel[fuel.length-1][3].length&&fuel[fuel.length-1][6].length)
		fuel[fuel.length-1][7]=(fuel[fuel.length-1][6]/fuel[fuel.length-1][3])*-1
}
function compilePower(){
	if(/^\t"*energy generation"*/.test(lines[i3]))
		power[power.length-1][4]=lines[i3].replaceAll(`"`,``).slice(19)
	if(power[power.length-1][3].length&&power[power.length-1][4].length)
		power[power.length-1][5]=(power[power.length-1][4]/power[power.length-1][3])*-1
	if(/^\t"*heat generation"*/.test(lines[i3]))
		power[power.length-1][6]=lines[i3].replaceAll(`"`,``).slice(17)
	if(power[power.length-1][3].length&&power[power.length-1][4].length)
		power[power.length-1][7]=(power[power.length-1][4]/power[power.length-1][6])
	if(/^\t"*energy capacity"*/.test(lines[i3]))
		power[power.length-1][8]=lines[i3].replaceAll(`"`,``).slice(16)
	if(power[power.length-1][3].length&&power[power.length-1][8].length)
		power[power.length-1][9]=(power[power.length-1][8]/power[power.length-1][3])*-1
}
function compileEngines(){
	if(/^\t"*thrust"* /.test(lines[i3]))
		engines[engines.length-1][4]=lines[i3].replaceAll(`"`,``).slice(8)
	if(engines[engines.length-1][4].length)
		engines[engines.length-1][5]=(engines[engines.length-1][4]/engines[engines.length-1][3][0])*-1
	if(/^\t"*afterburner thrust"*/.test(lines[i3]))
		engines[engines.length-1][6]=lines[i3].replaceAll(`"`,``).slice(20)
	if(engines[engines.length-1][6].length)
		engines[engines.length-1][7]=(engines[engines.length-1][6]/engines[engines.length-1][3][0])*-1
	if(/^\t"*reverse thrust"* /.test(lines[i3]))
		engines[engines.length-1][8]=lines[i3].replaceAll(`"`,``).slice(16)
	if(engines[engines.length-1][8].length)
		if(engines[engines.length-1][3][0].length)
			engines[engines.length-1][9]=(engines[engines.length-1][8]/engines[engines.length-1][3][0])*-1
		else if(engines[engines.length-1][3][1].length)
			engines[engines.length-1][9]=(engines[engines.length-1][8]/engines[engines.length-1][3][1])*-1
	if(/^\t"*turn"* /.test(lines[i3]))
		engines[engines.length-1][10]=lines[i3].replaceAll(`"`,``).slice(6)
	if(engines[engines.length-1][10].length)
		engines[engines.length-1][11]=(engines[engines.length-1][10]/engines[engines.length-1][3][0])*-1
}
function filterCalculations(index){
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`regenerators`).classList.add(`dark`)
	document.getElementById(`regeneratorsSort`).classList.add(`hidden`)
	document.getElementById(`cooling`).classList.add(`dark`)
	document.getElementById(`coolingSort`).classList.add(`hidden`)
	document.getElementById(`fuel`).classList.add(`dark`)
	document.getElementById(`fuelSort`).classList.add(`hidden`)
	document.getElementById(`power`).classList.add(`dark`)
	document.getElementById(`powerSort`).classList.add(`hidden`)
	document.getElementById(`engines`).classList.add(`dark`)
	document.getElementById(`enginesSort`).classList.add(`hidden`)
	if(index){
		filter=index
		localStorage.setItem(`filter`,index)
	}
	document.getElementById(filter).classList.remove(`dark`)
	document.getElementById(filter+`Sort`).classList.remove(`hidden`)
	sortFactions()
}
function sortFactions(){
	factionBreak=1
	document.getElementById(`sortFactions`).classList.remove(`dark`)
	document.getElementById(`ShieldSpace`).classList.add(`dark`)
	document.getElementById(`ShieldEnergy`).classList.add(`dark`)
	document.getElementById(`HullSpace`).classList.add(`dark`)
	document.getElementById(`HullEnergy`).classList.add(`dark`)
	document.getElementById(`CoolingSpace`).classList.add(`dark`)
	document.getElementById(`FuelCapacitySpace`).classList.add(`dark`)
	document.getElementById(`RamscoopSpace`).classList.add(`dark`)
	document.getElementById(`EnergyGenerationSpace`).classList.add(`dark`)
	document.getElementById(`EnergyGenerationHeat`).classList.add(`dark`)
	document.getElementById(`EnergyCapacitySpace`).classList.add(`dark`)
	document.getElementById(`ThrustSpace`).classList.add(`dark`)
	document.getElementById(`AfterburnerThrustSpace`).classList.add(`dark`)
	document.getElementById(`ReverseThrustSpace`).classList.add(`dark`)
	document.getElementById(`TurnSpace`).classList.add(`dark`)
	regenerators.sort(function(a,b){return b[11]-a[11]})
	regenerators.sort(function(a,b){return b[9]-a[9]})
	regenerators.sort(function(a,b){return b[7]-a[7]})
	regenerators.sort(function(a,b){return b[5]-a[5]})
	regenerators.sort(function(a,b){return a[1]-b[1]})
	cooling.sort(function(a,b){return b[6]-a[6]})
	cooling.sort(function(a,b){return a[1]-b[1]})
	fuel.sort(function(a,b){return b[7]-a[7]})
	fuel.sort(function(a,b){return b[5]-a[5]})
	fuel.sort(function(a,b){return a[1]-b[1]})
	power.sort(function(a,b){return b[9]-a[9]})
	power.sort(function(a,b){return b[7]-a[7]})
	power.sort(function(a,b){return b[5]-a[5]})
	power.sort(function(a,b){return a[1]-b[1]})
	engines.sort(function(a,b){return b[11]-a[11]})
	engines.sort(function(a,b){return b[9]-a[9]})
	engines.sort(function(a,b){return b[7]-a[7]})
	engines.sort(function(a,b){return b[5]-a[5]})
	engines.sort(function(a,b){return a[1]-b[1]})
	printOutput()
}
function sortRegenerators(value,id){
	factionBreak=0
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`ShieldSpace`).classList.add(`dark`)
	document.getElementById(`ShieldEnergy`).classList.add(`dark`)
	document.getElementById(`HullSpace`).classList.add(`dark`)
	document.getElementById(`HullEnergy`).classList.add(`dark`)
	if(id)
		document.getElementById(id).classList.remove(`dark`)
	regenerators.sort(function(a,b){return b[value]-a[value]})
	printOutput()
}
function sortCooling(value,id){
	factionBreak=0
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`CoolingSpace`).classList.add(`dark`)
	if(id)
		document.getElementById(id).classList.remove(`dark`)
	cooling.sort(function(a,b){return b[value]-a[value]})
	printOutput()
}
function sortFuel(value,id){
	factionBreak=0
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`FuelCapacitySpace`).classList.add(`dark`)
	document.getElementById(`RamscoopSpace`).classList.add(`dark`)
	if(id)
		document.getElementById(id).classList.remove(`dark`)
	fuel.sort(function(a,b){return b[value]-a[value]})
	printOutput()
}
function sortPower(value,id){
	factionBreak=0
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`EnergyGenerationSpace`).classList.add(`dark`)
	document.getElementById(`EnergyGenerationHeat`).classList.add(`dark`)
	document.getElementById(`EnergyCapacitySpace`).classList.add(`dark`)
	if(id)
		document.getElementById(id).classList.remove(`dark`)
	power.sort(function(a,b){return b[value]-a[value]})
	printOutput()
}
function sortEngines(value,id){
	factionBreak=0
	document.getElementById(`sortFactions`).classList.add(`dark`)
	document.getElementById(`ThrustSpace`).classList.add(`dark`)
	document.getElementById(`AfterburnerThrustSpace`).classList.add(`dark`)
	document.getElementById(`ReverseThrustSpace`).classList.add(`dark`)
	document.getElementById(`TurnSpace`).classList.add(`dark`)
	if(id)
		document.getElementById(id).classList.remove(`dark`)
	engines.sort(function(a,b){return b[value]-a[value]})
	printOutput()
}
function printOutput(){
	document.getElementById(`output`).innerHTML=``
	var alternation=0
	if(filter==`regenerators`){
		for(i1=0;i1<regenerators.length;i1++){
			if(regenerators[i1][5]!=0||regenerators[i1][7]!=0||regenerators[i1][9]!=0||regenerators[i1][11]!=0){
				if(factionBreak&&regenerators[i1][1]!==faction){
					faction=regenerators[i1][1]
					if(document.getElementById(`output`).innerHTML)
						document.getElementById(`output`).innerHTML+=`\n`
				}
				if(alternation%2==0)
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`">`+regenerators[i1][0]
				else
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`" style="filter:brightness(75%);">`+regenerators[i1][0]
				if(regenerators[i1][5]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:260px;">`+Math.round(regenerators[i1][5]*100*60)/100+`</span>`
				if(regenerators[i1][7]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:310px;">`+Math.round(regenerators[i1][7]*100)/100+`</span>`
				if(regenerators[i1][9]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:350px;">`+Math.round(regenerators[i1][9]*100*60)/100+`</span>`
				if(regenerators[i1][11]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:390px;">`+Math.round(regenerators[i1][11]*100)/100+`</span>`
				if(factionLookupString.get(regenerators[i1][0]))
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">`+factionLookupString.get(regenerators[i1][0])+`</span>`
				else
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">???</span>`
				alternation++
			}
		}
	}
	if(filter==`cooling`){
		for(i1=0;i1<cooling.length;i1++){
			if(cooling[i1][6]!=0){
				if(factionBreak&&cooling[i1][1]!==faction){
					faction=cooling[i1][1]
					if(document.getElementById(`output`).innerHTML)
						document.getElementById(`output`).innerHTML+=`\n`
				}
				if(alternation%2==0)
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`">`+cooling[i1][0]
				else
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`" style="filter:brightness(75%);">`+cooling[i1][0]
				if(cooling[i1][6]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:260px;">`+Math.round(cooling[i1][6]*100*60)/100+`</span>`
				if(cooling[i1][8]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:320px;">`+Math.round(cooling[i1][8]*100)/100+`</span>`
				if(factionLookupString.get(cooling[i1][0]))
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">`+factionLookupString.get(cooling[i1][0])+`</span>`
				else
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">???</span>`
				alternation++
			}
		}
	}
	if(filter==`fuel`){
		for(i1=0;i1<fuel.length;i1++){
			if(fuel[i1][5]!=0||fuel[i1][7]!=0){
				if(factionBreak&&fuel[i1][1]!==faction){
					faction=fuel[i1][1]
					if(document.getElementById(`output`).innerHTML)
						document.getElementById(`output`).innerHTML+=`\n`
				}
				if(alternation%2==0)
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`">`+fuel[i1][0]
				else
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`" style="filter:brightness(75%);">`+fuel[i1][0]
				if(fuel[i1][5]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:260px;">`+Math.round(fuel[i1][5]*100)/100+`</span>`
				if(fuel[i1][7]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:310px;">`+Math.round(fuel[i1][7]*100)/100+`</span>`
				if(factionLookupString.get(fuel[i1][0]))
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">`+factionLookupString.get(fuel[i1][0])+`</span>`
				else
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">???</span>`
				alternation++
			}
		}
	}
	if(filter==`power`){
		for(i1=0;i1<power.length;i1++){
			if(power[i1][5]!=0||power[i1][7]!=0||power[i1][9]!=0){
				if(factionBreak&&power[i1][1]!==faction){
					faction=power[i1][1]
					if(document.getElementById(`output`).innerHTML)
						document.getElementById(`output`).innerHTML+=`\n`
				}
				if(alternation%2==0)
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`">`+power[i1][0]
				else
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`" style="filter:brightness(75%);">`+power[i1][0]
				if(power[i1][5]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:260px;">`+Math.round(power[i1][5]*100*60)/100+`</span>`
				if(power[i1][7]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:310px;">`+Math.round(power[i1][7]*100)/100+`</span>`
				if(power[i1][9]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:350px;">`+Math.round(power[i1][9]*100)/100+`</span>`
				if(factionLookupString.get(power[i1][0]))
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">`+factionLookupString.get(power[i1][0])+`</span>`
				else
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">???</span>`
				alternation++
			}
		}
	}
	if(filter==`engines`){
		for(i1=0;i1<engines.length;i1++){
			if(engines[i1][5]!=0||engines[i1][7]!=0||engines[i1][9]!=0||engines[i1][11]!=0){
				if(factionBreak&&engines[i1][1]!==faction){
					faction=engines[i1][1]
					if(document.getElementById(`output`).innerHTML)
						document.getElementById(`output`).innerHTML+=`\n`
				}
				if(alternation%2==0)
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`">`+engines[i1][0]
				else
					document.getElementById(`output`).innerHTML+=`<p id="output`+i1+`" style="filter:brightness(75%);">`+engines[i1][0]
				if(engines[i1][5]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:260px;">`+Math.round(engines[i1][5]*100*60)/100+`</span>`
				if(engines[i1][7]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:310px;">`+Math.round(engines[i1][7]*100*60)/100+`</span>`
				if(engines[i1][9]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);left:380px;">`+Math.round(engines[i1][9]*100*60)/100+`</span>`
				if(engines[i1][11]!=0)
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(187,85,22,.75);left:440px;">`+Math.round(engines[i1][11]*100*60)/100+`</span>`
				if(factionLookupString.get(engines[i1][0]))
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">`+factionLookupString.get(engines[i1][0])+`</span>`
				else
					document.getElementById(`output`+i1).innerHTML+=`<span style="color:rgba(0,175,184,.75);right:20px;">???</span>`
				alternation++
			}
		}
	}
}