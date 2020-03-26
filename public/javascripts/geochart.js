google.charts.load('current', { packages: ['geochart'], mapsApiKey: 'MAPS_API_KEY' });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('/api/cities')
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
            const chartData = response.filter(r => !!r.score)
                .map(r => [r.location, r.score])

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Location');
            data.addColumn('number', 'Sentiment');
            data.addRows(chartData);

            var options = {
                title: 'How World reacts to #WFH',
                region: 'world',
                displayMode: 'markers',
                // backgroundColor: '#81d4fa',
                sizeAxis: { minValue: 0, maxValue: 1 },
                colorAxis: {
                    colors: ['#a60019', 'yellow', '#149103'],
                    values: [0, 0.5, 1]
                }
            };

            //create and draw the chart from DIV
            var chart = new google.visualization.GeoChart(document.getElementById('geochart'));
            chart.draw(data, options);
        });
}