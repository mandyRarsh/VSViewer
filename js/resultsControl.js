var url = 'http://172.16.7.60:5984/visuospatial_clinical/_design/formdata/_view/FormData?callback=?';
function getContent () {
	$("#resultSet").empty();
	var content = $.getJSON(url, function(data) {
	makeTable(content);
	});
}
	
function hasItemGroupOID(test) {
	if (test['ItemGroupOID']) {
		
		return true;
	}
	else {
		
		return false;
	}
}

function hasItemOID(test){
	if (test.value.hasOwnProperty('ItemOID')) {
		return true;
	}
	else {
		return false;
	}
}
function makeTable (rObj) {
	var rows = rObj.responseJSON.rows;
	var html;
	//$("#results").html(JSON.stringify(rows));
	for (i in rows) {
		if (rows[i].id !== undefined) {
			html+=("<tr><td>"+(rows[i].id)+"</td>");
			//alert("put in UUID");
			if (hasItemGroupOID(rows[i].value)) {
				html+="<td>"+(rows[i].value.ItemGroupOID)+"</td>";
				//alert("put in GROUPOID");
								
			}
			else {
				
				var j = 0;
				for (j in rows[i].value) {
					html+="<tr> <td>"+rows[i].id+"</td><td></td><td>"+(rows[i].value[j].ItemOID)
						+"</td><td>"+(rows[i].value[j].Value)+"</td></tr>";
					//alert("put in DATASET");
				}			
			}
		}
	$("#resultSet").append(html);
	}
	//alert(JSON.stringify(rObj.responseJSON.rows));
}
$(document).ready(function(){
	try {
	$("#loadResults").click (getContent);
	}
	catch (e) {
		alert(e);
	}
}
);
	