<!--异步例子-->

<div id="asyn_div" style="height: 400px; border: 1px solid #ccc; padding: 10px;"></div>
<div id="main" style="height: 400px; border: 1px solid #ccc; padding: 10px;"></div>
<script src="resources/js/echarts/echarts.js"></script>
<script type="text/javascript" src="/resources/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
    // 路径配置
    require.config({
        paths: {
            echarts: 'resources/js/echarts'
        }
    });

    require(
            [
                    'echarts',
                    'echarts/chart/line'
            ],
            function(ec){
                var demo = ec.init(document.getElementById('main'));
                demo.showLoading({
                    text: "正在努力加载哦……"
                });
                var option = {
                    title : {
                        text: '未来一周气温变化',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint : {
                                data : [
                                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                };

                demo.hideLoading();
                demo.setOption(option);
            }
    )


    // 异步调用例子
    var asynCharts;
    require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                asynCharts = ec.init(document.getElementById('asyn_div'));
                asynCharts.showLoading({
                    text: "正在努力加载哦……"
                });
                var options = {
                    title: {
                        text: "异步加载数据实例",
                        subtext: "异步测试"
                    },
                    tooltip: {
                        trigger: 'axis',
                        showDelay: 0,
                        hideDelay: 50
                    },
                    legend:{
                        orient : 'horizontal',
                        x : 'center',
                        y :'top',
                        data:[]
                    },
                    toolbox:{
                        show :true,
                        feature: {
                            orient: 'horizontal',
                            x : 'right',
                            y : 'top',
                            showTitle: true ,
                            dataZoom:{
                                show :true ,
                                title :{
                                    dataZoom: '区域缩放',
                                    dataZoomReset: '区域缩放-后退'
                                }
                            },
                            magicType:{
                                show : true ,
                                title :{
                                    line :'折线图',
                                    bar :'柱状图',
                                    pie:'饼状图'
                                },
                                type :['line','bar','pie']
                            },
                            restore: {
                                show :true ,
                                title: '还原'
                            },
                            saveAsImage :{
                                show : true ,
                                title :'保存为图片',
                                type :'jpge',
                                lang :'点击保存到本地'
                            }

                        }
                    },
                    dataZoom:{
                        show :true ,
                        height : 15
                    },
                    calculable: true ,
                    xAxis:[
                        {
                            type : 'category',
                            data : []
                        }
                    ],
                    yAxis:[
                        {
                            type :'value',
                            //splitArea: {show :true},
                            axisLabel : {
                                formatter: '{value} k'
                            }
                        }
                    ],
                    series:[]

                };

                // ajax 获取数据
                $.ajax({
                    type :"GET",
                    async:false,
                    url :"/getEcharsDemo",
                    success :function(data){
                        if(data){
                            options.xAxis[0].data =data.categoryList;
                            options.series =data.echartsSeriesList;
                            options.legend.data =data.legendList;

                            asynCharts.hideLoading();
                            asynCharts.setOption(options);
                        }
                    },
                    error : function(data){
                        alert ("异常咯！")
                    }
                });
            }
    );
</script>