// Minimum bedroom function 
$(function () {
	$("#minbedroom").spinner({
		min: 1,
		max: 10,
		spin: function (event, ui) {
			$(this).change();
		}
	});
});

// Maximum bedroom function 
$(function () {
	$("#maxbedroom").spinner({
		min: 1,
		max: 10,
		spin: function (event, ui) {
			$(this).change();
		}
	});
});


// Select menue qjuery function 
$(function () {
	$("#type").selectmenu();
});

$(function () {
	$("#month").selectmenu();
});

$(function () {
	$("#year").selectmenu();
});



// function for price slider 
$(function () {
	$("#price-range").slider({
		range: true,
		min: 200000,
		max: 900000,
		values: [250000, 600000],
		slide: function (event, ui) {
			$("#price").val("£" + ui.values[0] + " - £" + ui.values[1]);
		}
	});

	$("#price").val(" £" + $(" #price-range").slider("values", 0) + " - £" + $("#price-range").slider("values", 1));
});

//  function for displaying search results
$(function () {
	$("#Search").on("click", function () {

		var propetyType = $("#type").val();
		var maxBed = $("#minbedroom").val();
		var minBed = $("#maxbedroom").val();
		var month = $("#month").val();
		var year = $("#year").val();
		var priceMin = $("#price-range").slider("option", "values")[0];
		var priceMax = $("#price-range").slider("option", "values")[1];

		var output = "<h2>Search Results</h2><ul>";
		for (var i in data.properties) {
			if ((propetyType == data.properties[i].type) || (propetyType == "Any"))
				if ((minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms))
					if ((month == data.properties[i].added.month) || (month == "Anymonth"))
						if ((year == data.properties[i].added.year) || (year == "Anyyear"))
							if ((data.properties[i].price >= priceMin && data.properties[i].price <= priceMax))
							 {
								{
									{
										{
											{
												output += "<div><h2><li>" + "£" + data.properties[i].price + "</li></h2>" + "<img src=" + data.properties[i].picture + ">" +
													"<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'>Visit Page</a></button></div>";
											}
										}
									}
								}
							}
		}
		output += "</ul>";
		document.getElementById("Placeholder").innerHTML = output;
	});
});


// grouping  similar functions 
$( function() {
    $( ".rooms" ).controlgroup()
    
  } );

(function () {
	$(".Date-cls").controlgroup()

});


// function to display the favourites 
$(function () {
	$("#showFavs").on("click", function () {

		var x = document.getElementById("display-favs");
		if (x.style.display === "none") {
		  x.style.display = "block";
		} else {
		  x.style.display = "none";
		}
		var favList = JSON.parse(localStorage.getItem("favProperties"));
		var display = "<h2>Favourites</h2><ul>"
		for (var i in favList) {
			display += "<div><li>" + "£" + data.properties[i].price + "</li></h2>" + "<img src=" + data.properties[i].picture + ">" +
				"<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "'>Visit Page</a></button></div>";
		}

		display += "</ul>";
		document.getElementById("display-favs").innerHTML = display;
	});
});

// adding jquerry tabs 
$(function () {
	$("#tabs").tabs();
});


// adding propety to favourites function 
$(document).ready(function () {
	$("#addFavourite").on("click", function () {

		try {

			$(this).attr('disabled', true);
			var propIdToAdd = $(this).closest("div").attr("id");

			var userfav = JSON.parse(localStorage.getItem("favProperties"));
			if (userfav == null) {
				userfav = [];
			}

			if (!userfav.includes(propIdToAdd)) {

				userfav.push(propIdToAdd);
			}


			localStorage.setItem("favProperties", JSON.stringify(userfav));
			console.log(localStorage.getItem("favProperties"))
		}
		catch (e) {

			if (e == QUOTA_EXCEEDED_ERR) {

				console.log("Error Local Storage lomit Exceed");
			} else {

				console.log("Error Saving to local storage");
			}
		}
	});

});


// removing  propety from favourites function 
$(document).ready(function () {
	$("#removeFavourite").on("click", function () {

		$(this).attr('disabled', true);
		var propIdToRemove = $(this).closest("div").attr("id");
		var removefav = JSON.parse(localStorage.getItem("favProperties"));

				var index = removefav.indexOf(propIdToRemove);

		if (index > -1) {
			removefav.splice(index, 1);
		}
		localStorage.setItem("favProperties", JSON.stringify(removefav));
		
	});
});


// removing all propety from favourites function 
$(document).ready(function () {
	$("#clear").on("click", function () {

		var clearArray = JSON.parse(localStorage.getItem("favProperties"));
		console.log(clearArray)
		clearArray=[];
		localStorage.setItem("favProperties", JSON.stringify(clearArray));

		var clearDisplay ="<div></div>";
		document.getElementById("display-favs").innerHTML = clearDisplay;
		
	});
});

