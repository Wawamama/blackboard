const chart1El = document.getElementById('chart1')
const chart2El = document.getElementById('chart2')
const chart3El = document.getElementById('chart3')
const chart4El = document.getElementById('chart4')

const males = chart1El.dataset.males
const females = chart1El.dataset.females

const readMsg = chart2El.dataset.read
const unreadMsg = chart2El.dataset.unread

const shippedOrders = chart3El.dataset.shipped
const unshippedOrders = chart3El.dataset.toship

const moneyByMonth = JSON.parse(JSON.stringify(chart4El.dataset))
const months = Object.keys(moneyByMonth)
const totalByMonth = Object.values(moneyByMonth)

new Chart(chart1El, {
    type: 'bar',
    data: {
      labels: ["dudes", "dudesses"],
      datasets: [{
        label: 'Users gender',
        data: [males, females],
        backgroundColor: [
        '#1DB9C3',
        '#C32BAD'
        ],
        borderColor: [
         '#1698D9',
         '#B625D9'
        ],
        borderWidth: 1
      }]
    }
   });

new Chart(chart2El, {
type: 'doughnut',
data: {
    labels: ["Read Messages", "Unread messages"],
    datasets: [{
    data: [readMsg, unreadMsg],
    backgroundColor: [
    '#10D167',
    '#C22344'
    ],
    borderColor: [
        '#75D186',
        '#C20626'
    ],
    borderWidth: 1
    }]
}
});

new Chart(chart3El, {
    type: 'pie',
    data: {
        labels: ["Paid Orders Shipped", "Paid Orders To Ship"],
        datasets: [{
        data: [shippedOrders, unshippedOrders],
        backgroundColor: [
        '#3B5DDB',
        '#DB6C1B'
        ],
        borderColor: [
            '#2B04D9',
            '#DB9C6B'
        ],
        borderWidth: 1
        }]
    }
    });

    new Chart(chart4El, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: '$$/month',
                data: totalByMonth,
                backgroundColor: [
                '#10D167',
                '#C22344'
            ],
            borderColor: [
                '#75D186',
                '#C20626'
            ],
            borderWidth: 1
            }]
        }
        });