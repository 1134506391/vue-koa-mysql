<template>
    <div class="app-chart">
        <div class="chart-item" id="chart1"></div>
        <div class="chart-item" id="chart2"></div>
        <div class="chart-item" id="chart3"></div>
        <div class="chart-item" id="chart4"></div>
        <!-- 会员分布图      -->
        {{this.userSelectCountByMonth}}
    </div>
</template>


<script>
export default {
    data() {
        return {
            shopGoodsCount: "",
            userSelectCountByMonth:[]
        };
    },
    methods: {
        getChart1Data() {
            axios
                .get(this.URL + "userSelectCountByMonth")
                .then(response => {
                    response.data.data.forEach(item => {
                        this.userSelectCountByMonth.push({ "name": item.months, "data": item.count,"type":"bar" })
                    })
                    console.log(this.userSelectCountByMonth)
                    console.log(this.userSelectCountByMonth.name)
                    this.chart1()
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getChart3Data() {
            axios
                .get(this.URL + "shopGoodsCount")
                .then(response => {
                   
                    this.shopGoodsCount = response.data.data;
                    this.chart3();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        chart1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("chart1"));
            // 绘制图表
            myChart.setOption({
                // backgroundColor:"#000",
                title: {
                    text: "网站访问人数",
                    x: "center"
                },
                tooltip: {},
                xAxis: {
                    data: this.userSelectCountByMonth.name
                },
                yAxis: {},
                legend: {
                    data: ["客户", "商家", "管理员"],
                    bottom: 0
                },
                series: [
                    {
                        name: "客户",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: "商家",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    },
                    {
                        name: "管理员",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ],
                color: [
                    "#20a0ff",
                    "#ff4949",
                    "#13ce66",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3"
                ]
            });
        },
        chart2() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("chart2"));
            // 绘制图表
            myChart.setOption({
                title: { text: "销量趋势图" },
                tooltip: {},
                xAxis: {
                    // type: "category",
                    data: [
                        "2018-01",
                        "2018-02",
                        "2018-03",
                        "2018-04",
                        "2018-05",
                        "2018-06"
                    ]
                },
                yAxis: {
                    type: "value"
                },
                legend: {
                    data: ["客户", "商家", "管理员"],
                    bottom: 0
                },
                series: [
                    {
                        name: "客户",
                        data: [82, 92, 901, 934, 1290, 130, 1320],
                        type: "line"
                    },
                    {
                        name: "商家",
                        data: [80, 932, 90, 934, 1290, 1330, 132],
                        type: "line"
                    },
                    {
                        name: "管理员",
                        data: [20, 932, 901, 93, 1290, 1330, 1200],
                        type: "line"
                    }
                ],
                color: [
                    "#20a0ff",
                    "#ff4949",
                    "#13ce66",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3"
                ]
            });
        },
        chart3() {
            let myChart = echarts.init(document.getElementById("chart3"));
            myChart.setOption({
                title: {
                    text: "商家商品总数比例",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: "vertical",
                    bottom: 0,
                    data: this.shopGoodsCount.name
                },
                series: [
                    {
                        name: "商品总数",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: this.shopGoodsCount,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ],
                color: [
                    "#20a0ff",
                    "#ff4949",
                    "#13ce66",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3"
                ]
            });
        },
        chart4() {
            let myChart = echarts.init(document.getElementById("chart4"));
            var data = [
                {
                    name: "广东",
                    value: { sale: 33157, sale1: 17136, sale2: 16021 }
                },
                {
                    name: "江西",
                    value: { sale: 5445, sale1: 2659, sale2: 2786 }
                },
                {
                    name: "浙江",
                    value: { sale: 2021, sale1: 1133, sale2: 888 }
                },
                {
                    name: "山东",
                    value: { sale: 2504, sale1: 1432, sale2: 1072 }
                },
                {
                    name: "四川",
                    value: { sale: 6187, sale1: 2982, sale2: 3205 }
                },
                { name: "北京", value: { sale: 1119, sale1: 624, sale2: 495 } },
                {
                    name: "江苏",
                    value: { sale: 4091, sale1: 2524, sale2: 1567 }
                },
                { name: "福建", value: { sale: 1352, sale1: 686, sale2: 666 } },
                {
                    name: "上海",
                    value: { sale: 3276, sale1: 1467, sale2: 1809 }
                },
                { name: "天津", value: { sale: 430, sale1: 218, sale2: 212 } },
                { name: "安徽", value: { sale: 189, sale1: 73, sale2: 116 } },
                { name: "河北", value: { sale: 166, sale1: 88, sale2: 78 } },
                { name: "重庆", value: { sale: 66, sale1: 36, sale2: 30 } },
                { name: "河南", value: { sale: 73, sale1: 20, sale2: 53 } },
                { name: "云南", value: { sale: 16, sale1: 10, sale2: 6 } },
                { name: "广西", value: { sale: 62, sale1: 53, sale2: 9 } },
                { name: "辽宁", value: { sale: 22, sale1: 12, sale2: 10 } },
                { name: "陕西", value: { sale: 22, sale1: 6, sale2: 16 } },
                { name: "湖南", value: { sale: 9, sale1: 4, sale2: 5 } },
                { name: "美国", value: { sale: 2, sale1: 1, sale2: 1 } },
                { name: "黑龙江", value: { sale: 6, sale1: 0, sale2: 6 } },
                { name: "湖北", value: { sale: 0, sale1: 0, sale2: 0 } }
            ];
            var geoCoordMap = {
                广东: [113.274423, 23.136367],
                江西: [115.868167, 28.687568],
                浙江: [120.154962, 30.280469],
                山东: [116.964929, 36.704511],
                四川: [104.079956, 30.661263],
                北京: [116.40953, 39.91057],
                江苏: [118.804572, 32.062669],
                福建: [119.321437, 26.094111],
                上海: [121.480237, 31.243715],
                天津: [117.211088, 39.104348],
                安徽: [117.289918, 31.877125],
                河北: [114.482512, 38.029097],
                重庆: [106.547966, 29.569489],
                河南: [113.650945, 34.74735],
                云南: [102.719022, 25.058368],
                广西: [108.342112, 22.812643],
                辽宁: [123.439871, 41.810785],
                陕西: [108.947414, 34.270216],
                湖南: [112.995156, 28.123398],
                美国: [-99.731369, 39.246447],
                黑龙江: [126.641332, 45.75294],
                湖北: [114.293012, 30.595871]
            };

            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            //按量级分颜色
            myChart.setOption({
                title: {
                    text: "30 days sale data",
                    subtext: "data from taobao",
                    sublink: "http://www.taobao.com",
                    left: "center",
                    textStyle: {
                        color: "#fff"
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: function(params) {
                        var d = params.data;
                        console.log(d);
                        return (
                            d.name +
                            " 销量：" +
                            d.value[2].sale +
                            ",有效销量：" +
                            d.value[2].sale1
                        );
                    }
                },
                legend: {
                    orient: "vertical",
                    y: "bottom",
                    x: "right",
                    data: ["pm2.5"],
                    textStyle: {
                        color: "#fff"
                    }
                },
                geo: {
                    map: "china",
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: false,
                    itemStyle: {
                        normal: {
                            areaColor: "#323c48",
                            borderColor: "#111"
                        },
                        emphasis: {
                            areaColor: "#2a333d"
                        }
                    }
                },
                series: [
                    {
                        name: "pm2.5",
                        type: "scatter",
                        coordinateSystem: "geo",
                        data: convertData(data),
                        symbolSize: function(val) {
                            return val[2].sale / 300;
                        },
                        label: {
                            normal: {
                                formatter: "{b}",
                                position: "right",
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#ddb926"
                            }
                        }
                    },
                    {
                        name: "Top 5",
                        type: "effectScatter",
                        coordinateSystem: "geo",
                        data: convertData(
                            data
                                .sort(function(a, b) {
                                    return b.value.sale - a.value.sale;
                                })
                                .slice(0, 3)
                        ),
                        symbolSize: function(val) {
                            return val[2].sale1 / 300;
                        },
                        showEffectOn: "render",
                        rippleEffect: {
                            brushType: "stroke"
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: "{b}",
                                position: "right",
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#f4e925",
                                shadowBlur: 10,
                                shadowColor: "#333"
                            }
                        },
                        zlevel: 1
                    }
                ],
                color: [
                    "#20a0ff",
                    "#ff4949",
                    "#13ce66",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3"
                ]
            });
        }
    },
    created() {
        this.getChart3Data();
        this.getChart1Data();
    },
    mounted() {
        
        this.chart2();
        this.chart4();
        console.log($(".chart-item"));
    }
};
</script>

<style lang="scss" scoped>
.app-chart {
    display: flex;
    flex-wrap: wrap;
    .chart-item {
        flex: 0 0 50%;
        width: 50%;
        height: 500px;
        padding: 40px;
        box-sizing: border-box;
        margin-bottom: 40px;
    }
}
</style>

