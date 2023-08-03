let chart // Declare chart variable outside the fetch so it can be accessed elsewhere

fetch("../../Scraper/language_usage.json")
  .then((res) => res.json())
  .then((data) => {
  let pythonUsageData = [];
  let javascriptUsageData = [];
  let phpUsageData = [];
  let javaUsageData = [];
  let csUsageData = [];
  let cppUsageData = [];
  let cUsageData = [];
  let typescriptUsageData = [null, null, null, null, 9.5, 17.4, 21.2, 25.4, 30.19, 34.83]
  let goUsageData = [null, null, null, null, 4.3, 7.1, 8.2, 8.8, 9.55, 11.15];
  let sqlUsageData = [59.6, 57.1, 48.00, 49.1, 51.2, 57.0, 54.4, 54.7, 47.08, 49.43];

  for (let year = 2013; year <= 2022; year++) {
    pythonUsageData.push(data[year.toString()]['Python']);
    javascriptUsageData.push(data[year.toString()]['JavaScript']);
    phpUsageData.push(data[year.toString()]['PHP']);
    javaUsageData.push(data[year.toString()]['Java']);
    csUsageData.push(data[year.toString()]['C#']);
    cppUsageData.push(data[year.toString()]['C++']);
    cUsageData.push(data[year.toString()]['C']);
  }
     console.log(typescriptUsageData);


    let myChart =  document.getElementById('myChart').getContext('2d');
    
    chart = new Chart(myChart, {
      type:'line',
      data:{
        labels:['2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
        datasets: 
        [{
          label: 'Python',
          data: pythonUsageData,
          borderColor: 'red',
          fill: false,
          hidden: true,
        },
        {
          label: 'Javascript',
          data: javascriptUsageData,
          borderColor: 'blue',
          fill: false,
          hidden: true,
        },
        {
          label: 'SQL',
          data: sqlUsageData,
          borderColor: 'green',
          fill: false,
          hidden: true,
        },
        {
          label: 'Java',
          data: javaUsageData,
          borderColor: 'purple',
          fill: false,
          hidden: true,
        },
        {
          label: 'C#',
          data: csUsageData,
          borderColor: 'pink',
          fill: false,
          hidden: true,
        },
        {
          label: 'C',
          data: cUsageData,
          borderColor: 'lime',
          fill: false,
          hidden: true,
        },
        {
          label: 'C++',
          data: cppUsageData,
          borderColor: 'orange',
          fill: false,
          hidden: true,
        },
        {
          label: 'Typescript',
          data: typescriptUsageData,
          borderColor: 'tan',
          fill: false,
          hidden: true,
        },
        {
          label: 'Go',
          data: goUsageData,
          borderColor: 'violet',
          fill: false,
          hidden: true,
        },
        {
          label: 'PHP',
          data: phpUsageData,
          borderColor: 'yellow',
          fill: false,
          hidden: true,
        }
      ]
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Language Usage Over Time',
            font: {
              size: 20
            },
          },
          legend: {
            position: 'right',
            padding: 30,
            labels:{
              padding: 20,
              font:{
                size: 20,

              }
            },

          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Define a callback to append '%' to the tick labels
              callback: function(value, index, values) {
                return value + '%';
              }
            }
          }
        }
      }
    });
});
