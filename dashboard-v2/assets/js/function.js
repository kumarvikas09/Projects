$(document).ready(function () {
  $(".menu_navs li").click(function () {
    $(".menu_navs li").removeClass("active");
    $(this).addClass("active");
  });

// chart js start
  const versusChart = $("#budgetChart");
  if (versusChart.length) {
    new Chart(versusChart, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Actual Spend",
            data: [180, 130, 160, 170, 140, 90, 130, 160, 170, 90, 140, 180],
            backgroundColor: "#dbeafe",
            borderRadius: 5,
            barThickness: 20,
          },
          {
            label: "Budgeted Amount",
            data: [200, 150, 100, 180, 170, 220, 160, 120, 180, 210, 150, 230],
            backgroundColor: "#0077b6",
            borderRadius: 5,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              color: "#848484",
              boxWidth: 15,
              boxHeight: 15,
              font: {
                family: "Inter",
                size: 12,
                weight: "400",
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#848484",
              font: {
                family: "Inter",
                size: 14,
                weight: "400",
              },
            },
          },
          y: {
          min: 0,       // minimum Y value
            max: 250, 
            grid: {
              color: "#F0F0F0",
            },
            ticks: {
              callback: (value) => `$${value}k`,
              count: 5,
              color: "#848484",
              font: {
                family: "Inter",
                size: 14,
                weight: "400",
              },
            },
          },
        },
      },
    });
  }
// chart js start
});
