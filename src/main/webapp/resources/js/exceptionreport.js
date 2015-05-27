(function () {

    var initEvent = function () {
        // 初始化所有的dropdown
        $('.ui.dropdown')
            .dropdown()
        ;

        initTableData();

        //加载页面则完成第一次搜索结果展示
        $(".c-search").click();
    };
    var initTableData = function () {
        // tpl
        $.addTemplateFormatter({
            formatExDetail: function (va) {
                var uhour = $(this).attr("d-hour");
                var uappname = $(this).attr("d-appname");
                var str = "/exceptiondetail?uDate=" + uhour + "&methodName=" + va + "&appName=" + uappname;
                return '<a href=' + str + '>' + va + '</a>';
            },
            formatExCount: function(va){
                var uyes = $(this).attr("data-yes");
                var ulas = $(this).attr("data-las");
                // 规则
                if(uyes !="0" && ulas !="0"){
                    var redexnum=parseInt($("#redEXNum").val());
                    if(parseInt(va)/parseInt(uyes)>redexnum || parseInt(va)/parseInt(ulas)>redexnum){
                        $(this).parent("tr").addClass("error");
                    }
                }

                return va;
            }
        })

        // params
        $(".c-search").bind('click', function () {
            var uDate = $(".c-date-select").dropdown('get value');
            var uAppName = $(".c-channel-select").dropdown('get value');
            var uHour = $(".c-time-select").dropdown('get value');
            var uTopNum = $(".c-topnum-select").dropdown('get value');
            $(this).addClass("loading");

            $.ajax({
                url: "/getexceptiondata",
                async: false,
                data: {
                    uDate: uDate,
                    uAppName: uAppName,
                    uHour: uHour,
                    uTopNum: uTopNum
                },
                success: function (data) {
                    if (data == undefined || data == null) {
                        alert("异常了！");
                    }
                    if(data =="") {
                        $("#tmp-searched-result-container").html('<tr><td colspan="7" style="text-align:center"> <h2>没有数据！</h2> </td> </tr>');
                        return ;
                    } ;
                    $("#tmp-searched-result-container").loadTemplate("#tmp-searched-result", data);
                    $('.c-searched-table').tablesort();

                    $(this).removeClass("loading");
                },
                error: function (errMsg) {
                    alert("方法失败，请刷新页面试试！");
                    $(this).removeClass("loading");
                }
            });

            initBarEcharts();

        });


    };
    var initBarEcharts = function () {
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
                'echarts/chart/bar',
                'echarts/chart/line'
            ],
            function (ec) {
                asynCharts = ec.init(document.getElementById('exceptionBarChart'));
                asynCharts.showLoading({
                    text: "正在努力加载哦……"
                });

                var options = {
                    title : {
                        text: "方法异常排行",
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[]
                    },
                    toolbox: {
                        show: true,
                        feature: {
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
                    calculable : true,
                    // 横向
                    xAxis : [
                        {
                            type : 'value',
                            boundaryGap : [0, 0.01]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : []
                        }
                    ],
                    series : []
                };

                // ajax 获取数据
                $.ajax({
                    type: "GET",
                    url: "/getexceptiondatabar",
                    data: {
                        uDate: $(".c-date-select").dropdown('get value'),
                        uAppName: $(".c-channel-select").dropdown('get value'),
                        uHour: $(".c-time-select").dropdown('get value'),
                        uTopNum: $(".c-topnum-select").dropdown('get value')
                    },
                    success: function (data) {
                        if (data) {
                            options.yAxis[0].data = data.categoryList;
                            options.series = data.echartsSeriesList;
                            options.legend.data = data.legendList;

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