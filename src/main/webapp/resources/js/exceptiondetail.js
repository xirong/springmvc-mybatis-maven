(function () {
    var initEvent = function () {
        initDependency();
        initLineEcharts();
    };

    var initDependency = function () {
        $('.ui.dropdown').dropdown({
            onChange: function (value) {
                $("#h_uDate").val(value);
                initLineEcharts();
            }
        })
    };
    var initLineEcharts = function () {
        // 路径配置
        require.config({
            paths: {
                echarts: 'resources/js/echarts'
            }
        });

        var asynCharts;
        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar'
            ],
            function (ec) {
                asynCharts = ec.init(document.getElementById('exceptionHoursDetail'));
                asynCharts.showLoading({
                    text: "正在努力加载哦……"
                });
                var options = {
                    title: {
                        text: '异常详情',
                        link:'http://webms.elong.com/log/LogError/LogErrorList.html?productLine=onlineweb',
                        subtext: "周期对比",
                        textStyle:{
                            fontSize: 18,
                            fontWeight: 'bolder',
                            color: '#00b2f3'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        showDelay: 0,
                        hideDelay: 50
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top',
                        data: []
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            orient: 'horizontal',
                            x: 'right',
                            y: 'top',
                            showTitle: true,
                            dataZoom: {
                                show: true,
                                title: {
                                    dataZoom: '区域缩放',
                                    dataZoomReset: '区域缩放-后退'
                                }
                            },
                            magicType: {
                                show: true,
                                title: {
                                    line: '折线图',
                                    bar: '柱状图',
                                    pie: '饼状图'
                                },
                                type: ['line', 'bar', 'pie']
                            },
                            restore: {
                                show: true,
                                title: '还原'
                            },
                            saveAsImage: {
                                show: true,
                                title: '保存为图片',
                                type: 'jpge',
                                lang: '点击保存到本地'
                            }

                        }
                    },
                    dataZoom: {
                        show: true,
                        height: 15
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            name: '时间段',
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '异常次数',
                            //splitArea: {show :true},
                            axisLabel: {
                                formatter: '{value}次'
                            }
                        }
                    ],
                    series: []

                };

                // ajax 获取数据
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "/getexceptiondetaildata",
                    data: {
                        methodName: $("#h_methodName").val(),
                        uDate: $("#h_uDate").val(),
                        appName: $("#h_appName").val()
                    },
                    success: function (data) {
                        if (data) {
                            options.xAxis[0].data = data.categoryList;
                            options.series = data.echartsSeriesList;
                            options.legend.data = data.legendList;
                            var tUrl="http://webms.elong.com/log/LogError/LogErrorList.html?productLine=onlineweb&logLevel=ERROR&logMsg=&pageUrl=&whereCondition=&serverName=&appName=";
                            options.title.link =tUrl+$("#h_appName").val()+"&methodname="+$("#h_methodName").val()+"&startTime="+$("#h_uDate").val()+"&endTime="+$("#h_uDate").val();

                            asynCharts.hideLoading();
                            asynCharts.setOption(options);
                        }else{
                            asynCharts.hideLoading();
                        }
                    },
                    error: function (data) {
                        asynCharts.hideLoading();
                        alert("异常咯！")
                    }
                });
            }
        );
    };

    initEvent();
})();