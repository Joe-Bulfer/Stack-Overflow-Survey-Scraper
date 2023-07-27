// JavaScript
let chart; // Declare chart variable outside the fetch so it can be accessed elsewhere

fetch("../../Scraper/language_usage.json")
  .then((res) => res.json())
  .then((data) => {
    let pythonUsageData = [
      data['2013']['Python'],
      data['2014']['Python'],
      data['2015']['Python'],
      data['2016']['Python'],
      data['2017']['Python'],
      data['2018']['Python'],
      data['2019']['Python'],
      data['2020']['Python'],
      data['2021']['Python'],
      data['2022']['Python']
    ];

    let javascriptUsageData = [
      data['2013']['JavaScript'],
      data['2014']['JavaScript'],
      data['2015']['JavaScript'],
      data['2016']['JavaScript'],
      data['2017']['JavaScript'],
      data['2018']['JavaScript'],
      data['2019']['JavaScript'],
      data['2020']['JavaScript'],
      data['2021']['JavaScript'],
      data['2022']['JavaScript']
    ];

    let myChart =  document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(myChart, {
      type:'line',
      data:{
        labels:['2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        datasets:[{
          label: 'Python Usage',
          data: pythonUsageData,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Python Usage Over Time'
        }
      }
    });

    // Event listeners for the buttons
    document.getElementById('pythonButton').addEventListener('click', () => {
      chart.data.datasets[0].data = pythonUsageData;
      chart.data.datasets[0].label = 'Python Usage';
      chart.options.title.text = 'Python Usage Over Time';
      chart.update();
    });

    document.getElementById('javascriptButton').addEventListener('click', () => {
      chart.data.datasets[0].data = javascriptUsageData;
      chart.data.datasets[0].label = 'JavaScript Usage';
      chart.options.title.text = 'JavaScript Usage Over Time';
      chart.update();
    });
  });
