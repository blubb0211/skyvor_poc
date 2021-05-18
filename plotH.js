function getAll(allTraces){
	
	var allPlots = [];
	var layout;
	var annotations = [];

	var out = allChecked();
	var num = out['num'];
	var traceNames = out['traceNames'];
	// set y_loc
	var y_loc_list = [1.4];
	if(num==2){
		y_loc_list = [1.1, 0.45];
	} else if (num==3){
		y_loc_list = [1.05, 0.66, 0.25];
	}

	layout = getBaseLayout(num, traceNames);

	for(var i=0; i<traceNames.length; i++){
		var tempTraceName = traceNames[i];
		// debugger;
		var tempTrace = allTraces[tempTraceName];
		var index = i+1;
		var y_loc = y_loc_list[i];

		tempTrace['name'] = tempTraceName;
		if(index!=1){
			tempTrace['xaxis'] = 'x'+ index;
			tempTrace['yaxis'] = 'y'+ index;
		}
		
		// allPlots for plotting together
		allPlots.push(tempTrace);

		// layout for position plot
		layout = addYaxisLayout(layout, out['unit'][tempTraceName], index);
		
		// annotations for subplot title
		addTitle(annotations, tempTraceName, y_loc);
	}

	// prepare final layout
	addXaxisLayout(layout, index);
	layout['annotations'] = annotations;

	var output = [];
	output['allPlots'] = allPlots;
	output['layout'] = layout;

	return output;
}

function getBaseLayout(num, traceNames){
	var layout = {
	  grid: {rows: num, columns: 1, pattern: 'independent'},
	  width: 800,
      height: 250*num,
	};

	return layout;

}

function addXaxisLayout(layout, index){
	var xName = 'xaxis';
	if(index!=1){
		xName += index; 
	}

	layout[xName] = {
	    title: 'Date-Time',
	    titlefont: {
	      family: 'Arial, sans-serif',
	      size: 18,
	      color: 'lightgrey'
	    },
	    showticklabels: true,
	    tickangle: 'auto',
	    tickfont: {
	      family: 'Old Standard TT, serif',
	      size: 14,
	      color: 'black'
	    },
	    exponentformat: 'e',
	    showexponent: 'all'
	  }
	  return layout;
}

function addYaxisLayout(layout, titleText, index){
	var yName = 'yaxis';
	if(index!=1){
		 yName += index;
	} 

	layout[yName] = 
	 {
	    title: titleText,
	    titlefont: {
	      family: 'Arial, sans-serif',
	      size: 18,
	      color: 'lightgrey'
	    },
	    showticklabels: true,
	    tickangle: 45,
	    tickfont: {
	      family: 'Old Standard TT, serif',
	      size: 14,
	      color: 'black'
	    },
	    exponentformat: 'e',
	    showexponent: 'all'
	  }
	  return layout;
}

function allChecked(){
	// debugger;
	var out = [];
	var num = 0;
	var traceNames = [];
	var unit =[];

	if(document.getElementById("spo2").checked){
		num += 1;
		traceNames.push("Oxygen");
		unit["Oxygen"] = "%";
	}
	if(document.getElementById("hr").checked){
		num += 1;
		traceNames.push("Heart Rate");
		unit["Heart Rate"] = "bpm";
	}
	if(document.getElementById("steps").checked){
		num += 1;
		traceNames.push("Activity");
		unit["Activity"] = "steps";
	}
	out['num'] = num;
	out['traceNames'] = traceNames;
	out['unit'] = unit;
	return out;
}

function addTitle(anno, titleText, y_loc){ 	
	var current_setting = {
		    text: titleText,
		      font: {
		      size: 16,
			   color: 'black',
		    },
		    showarrow: false,
		    align: 'center',
		    x: 0.5,
		    y: y_loc,
		    xref: 'paper',
		    yref: 'paper',
		  }
	anno.push(current_setting);
	return anno;
}

function filterDate(allTraces){
	// parse start and end date
	const start_date_string = document.getElementById("filter-start").value;
	const end_date_string = document.getElementById("filter-end").value;
	const start_date = new Date(start_date_string);
	// the end time will be end of the selected day
	const end_date = new Date(end_date_string+" 23:59");

	// if the end date is today, then set the end time to be now
	if(Date.today().toString("yyyy-MM-d") == end_date_string){
		const end_date = new Date(Date.today().setTimeToNow());
	}
	// compare
	var final_all_traces = [];

	// loop through different traces
	for(var trace in allTraces){
		
		// loop through all data points in a trace
		var final_x = [];
		var final_y = [];
		
		// careful clone without changing original value
		var final_trace = [];
		Object.assign(final_trace, allTraces[trace]);

		// debugger;
		for(var i=0; i<final_trace["x"].length; i++){
		var d = new Date(final_trace["x"][i]);
		if (d.between(start_date, end_date)){
			final_x.push(final_trace["x"][i]);
			final_y.push(final_trace["y"][i])
			}
		}
		// prepare output for one trace
		final_trace.x = final_x;
		final_trace.y = final_y;
		final_all_traces[trace] = final_trace;
	}

	return final_all_traces;

}

function setCalendar(){
	// min date
    var startDateElement = document.getElementById("filter-start");
    startDateElement.min = new Date(allTraces['Heart Rate'].x[numPoints-1]).toString("yyyy-MM-d");
    startDateElement.value = new Date(allTraces['Heart Rate'].x[numPoints-1]).toString("yyyy-MM-d");

    // max date
    var endDateElement = document.getElementById("filter-end");
    endDateElement.max = new Date().toISOString().split("T")[0];
    endDateElement.value = new Date().toISOString().split("T")[0];
    endDateElement.min = startDateElement.min;
                
}
