function getTime(numPoints, interval){

	var times = [];
	var timeNow = Date.today().setTimeToNow();
	for(var i=0; i<numPoints; i++){
		times.push(timeNow.addMinutes(-i*interval).toString("yyyy-MM-d HH:mm"));
	}
	return times;
}

function getData(numPoints, minValue, maxValue,std){
	var data = [];

	for(var i=0; i<numPoints; i++){
		data.push(Math.random()*std*(maxValue-minValue) + minValue);
	}
	return data;
}

function getTimeTrace(numPoints, interval, minValue, maxValue, std,traceName){
	trace = {
		x: getTime(numPoints, interval),
		y: getData(numPoints, minValue, maxValue, std),
		type: 'scatter',
		name: traceName
	};
	return trace;
}	

function getBarplot(numPoints, interval, minValue, maxValue, std,traceName){
	trace = {
		x: getTime(numPoints, interval),
		y: getData(numPoints, minValue, maxValue, std),
		type: 'bar',
		name: traceName
	};
	return trace;
}	

	