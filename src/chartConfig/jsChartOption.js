export const jsErrorOption = (result) => {
  return {
    color: [ "#5d5cb6" ],
    tooltip: {
      trigger: "axis",
      // axisPointer: {
      //   type: 'cross',
      //   crossStyle: {
      //     color: '#666'
      //   }
      // },
      confine: true,
      position: ["50%", "50%"],
      alwaysShowContent: false,
      hideDelay: 100
    },
    grid: {
      top: "15%",
      left: "5%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: result[0],
        axisPointer: {
          type: "shadow"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "次数",
        min: 0,
        max: "dataMax",
        axisLabel: {
          formatter: "{value}"
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }

      }
    ],
    series: [
      {
        name: "Error发生次数：",
        type: "bar",
        data: result[1],
      }
    ]
  }
}

// js错误排序报排序表
export const jsErrorSortOption = (resArray) => {
  const categoryArray = []
  const barArray = []
  let percentArray = []
  let total = 0
  const loopCount = resArray.length > 20 ? 20 : resArray.length
  for (let i = 0; i < resArray.length; i ++) {
    total += resArray[i].count
  }
  for (let i = 0; i < loopCount; i ++) {
    categoryArray.push(resArray[i].errorMessage)
    barArray.push(resArray[i].count)
    percentArray.push(parseFloat(resArray[i].count * 100 / total))
  }
  percentArray = percentArray.reverse()
  return {
    tooltip: {
      trigger: "axis",
      alwaysShowContent: false,
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: "shadow"        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: "0%",
      left: "3%",
      right: "15%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      position: "top",
      boundaryGap: [0, 0.01],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "#eaeaea",
          type: "dashed"
        }
      },
    },
    yAxis: {
      type: "category",
      data: categoryArray.reverse(),
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#666",
          type: "dashed"
        }
      },
    },
    series: [
      {
        name: "js报错数量",
        type: "bar",
        label: {
          normal: {
            position: "right",
            show: true,
            color: "#111",
            formatter: (res) => {
              return parseFloat(percentArray[res.dataIndex]).toFixed(2) + "%"
            }
          }
        },
        areaStyle: {normal: {}},
        data: barArray.reverse(),
        itemStyle: {
          normal: {
            color: "#f38376"
          }
        },
      }
    ]
  }
}