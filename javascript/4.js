var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.covid19api.com/summary", true);

xhr.onload = function(){
	if(this.status == 200){
		var data = JSON.parse(this.responseText);
		let output = '';
		var tbval = document.getElementById("tbval");
		
		for(var i=0; i<data['Countries'].length; i++){
			var row = tbval.insertRow();
			
			let cell1 = row.insertCell(0);
			cell1.innerHTML = data["Countries"][i]["Country"];

			let cell2 = row.insertCell(1);
			cell2.innerHTML = data["Countries"][i]["TotalConfirmed"];

			let cell3 = row.insertCell(2);
			cell3.innerHTML = data["Countries"][i]["TotalRecovered"];

			let cell4 = row.insertCell(3);
			cell4.innerHTML = data["Countries"][i]["TotalDeaths"];		
		}		
		let totalInfected = document.getElementById("totalInfected");
		totalInfected.innerHTML = data["Global"].TotalConfirmed;
		totalInfected = data["Global"].TotalConfirmed;
		// console.log(totalInfected);

		let totalRecovered = document.getElementById("totalRecovered");
		totalRecovered.innerHTML = data["Global"].TotalRecovered;
		totalRecovered = data["Global"].TotalRecovered;

		let totalDeaths = document.getElementById("totalDeaths");
		totalDeaths.innerHTML = data["Global"].TotalDeaths;
		totalDeaths = data["Global"].TotalDeaths;

		var cht = document.getElementById("myChart").getContext('2d');

		// Chart.defaults.global.defaultFontFamily = 'consolas' ;
		Chart.defaults.global.defaultFontSize = 18;
		// Chart.defaults.global.defaultFontColor ='#777';

		var chart = new Chart(cht, {
			type:'bar',
			 data: {
		        labels: ["Total Confirmed", "Total Recovered", "Total Deaths"],
		        datasets: [{
		            label: 'Covid-19',
		            backgroundColor: ['#f4fa9c', '#17b978', '#d72323'],
		            borderWidth:1,
		            borderColor: '#777',
		            hoverBorderWidth:3,
		            // hoverBorderColor:'#000',
		            data: [totalInfected, totalRecovered, totalDeaths]
		        }]
		    },
		    options:{
		    	title:{
		    		display:true,
		    		text:'Covid-19 Graph',
		    		fontSize:30
		    	},
		    	legend:{
		    		display:false
		    	},
		    	
		    }

		});
}
}
xhr.send();

// search form
let form = document.getElementById("searchForm").addEventListener('keyup', searchFun);

function searchFun(e){
	e.preventDefault();
	//Taking input value
	let input = document.getElementById("searchForm").value.toLowerCase();
	//selecting table
	let table = document.getElementById("tbval");
	//selecting row
	let tRow = table.getElementsByTagName("tr");
	// console.log(tRow);
	for(var i=0; i<tRow.length; i++){
		let td = tRow[i].getElementsByTagName('td')[0];

		if(td){
			let textVal = td.textContent || td.innerHTML;

			if(textVal.toLowerCase().indexOf(input) > -1){
				tRow[i].style.display = ''
			}else {
				tRow[i].style.display = 'none';
			}
		}
	}
}

// var cht = document.getElementById("myChart").getContext('2d');

// var chart = new Chart(cht, {
// 	type:'bar',
// 	 data: {
//         labels: ["Total Confirmed", "Total Recovered", "Total Deaths"],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [12, 32, 56]
//         }]
//     },

// });