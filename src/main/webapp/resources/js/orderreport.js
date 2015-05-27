(function () {
    var initEvent = function () {
        // 初始化所有的dropdown
        $('.ui.dropdown')
            .dropdown()
        ;

        bindClickEvent();

        //加载页面则完成第一次搜索结果展示
        $(".c-search-channel").click();
    };

    var bindClickEvent = function () {
        // 各频道订单
        $(".c-search-channel").bind("click", function () {

            $(".c-search-channel").addClass("loading");
            // 首次若是酒店频道则显示酒店各维度的统计，不是的话不显示
            var temp_hvaluel = $(".c-channel-select").dropdown('get value');
            if (temp_hvaluel != "hotel" && temp_hvaluel != "Hotel") {
                $("#hotelDimensionReport").hide();
            }

            // 路径配置
            require.config({
                paths: {
                    echarts: 'resources/js/echarts'
                }
            });
            var channelCharts;
            require(
                [
                    'echarts',
                    'echarts/chart/line',
                    'echarts/chart/bar',
                    'echarts/chart/pie'
                ],
                function (ec) {
                    channelCharts = ec.init(document.getElementById('channelReport'));
                    channelCharts.showLoading({
                        text: "正在努力加载哦……"
                    });
                    var options = {
                        title: {
                            text: "频道订单图表",
                            subtext: "对比图"
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
                                name: '订单量',
                                //splitArea: {show :true},
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series: []

                    };

                    // ajax 获取数据，展现频道的订单情况
                    setTimeout(function () {
                        $.ajax({
                            type: "GET",
                            //async: false,
                            url: "/getChannelOrder",
                            data: {
                                uDate: $(".c-channel-date-select").dropdown('get value'),
                                uAppName: $(".c-channel-select").dropdown('get value')
                            },
                            success: function (data) {

                                if (data) {
                                    options.xAxis[0].data = data.categoryList;
                                    options.series = data.echartsSeriesList;
                                    options.legend.data = data.legendList;
                                    options.title.text = $(".c-channel-select").dropdown('get value') + "频道订单分布";

                                    channelCharts.hideLoading();
                                    channelCharts.setOption(options);
                                } else {
                                    channelCharts.hideLoading();
                                }

                                $(".c-search-channel").removeClass("loading");
                            },
                            error: function (data) {
                                alert("方法异常请查看！")
                            }
                        });

                        // 加载酒店频道各维度统计报表
                        if ($(".c-channel-select").dropdown('get value') == "hotel" ||
                            $(".c-channel-select").dropdown('get value') == "Hotel") {
                            loadHotelDimensionEcharts();
                        }
                    }, 200);
                }
            );
        });

    };

    var loadHotelDimensionEcharts = function () {
        $("#hotelDimensionReport").html("<h2>酒店订单各维度统计报表</h2>");
        $("#hotelDimensionReport").show();
        // 路径配置
        require.config({
            paths: {
                echarts: 'resources/js/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/line',
                'echarts/chart/bar',
                'echarts/chart/pie'
            ],
            function (ec) {
                var lineOptions = {
                    title: {
                        text: "酒店各维度订单报表",
                        subtext: "来源统计"
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
                            name: '订单量',
                            //splitArea: {show :true},
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: []

                };
                var barOptions = {
                    title: {
                        text: "酒店各维度订单报表",
                        subtext: "对比图"
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
                var pieOptions = {
                    title: {
                        text: "酒店各维度订单报表",
                        subtext: "对比图"
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

                $.ajax({
                    type: "GET",
                    async: true,
                    url: "/getDimensionOrder",
                    data: {
                        uDate: $(".c-channel-date-select").dropdown('get value'),
                        uDimensionType: 1
                    },
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            lineOptions.xAxis[0].data = data[i].categoryList;
                            lineOptions.series = data[i].echartsSeriesList;
                            lineOptions.legend.data = data[i].legendList;
                            lineOptions.title.text = data[i].titleName;

                            var t_div = '<div id=' + data[i].titleName + ' style="height: 300px; border: 1px solid #ccc; padding: 10px;"></div>';
                            $("#hotelDimensionReport").append(t_div);
                            var t_echarts = ec.init(document.getElementById(data[i].titleName));
                            t_echarts.showLoading({text: "正在努力加载哦……"});
                            t_echarts.hideLoading();
                            t_echarts.setOption(lineOptions);

                        }


                    },
                    error: function (data) {
                        $("#c-search-channel").removeClass("loading");
                        alert("异常咯！")
                    }
                });


            }
        );
    };
    initEvent();
})();