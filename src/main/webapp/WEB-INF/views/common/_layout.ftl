<#macro layoutHead title >
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${title!""} - 日志监控平台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="resources/images/favicon.ico">
    <link rel="stylesheet" href="resources/css/semantic.min.css" media="all"/>

    <#nested>

</head>
</#macro>

<#macro layoutBody>
<body>
<!--header-->
    <#include "_header.ftl" >
    <@header></@header>

<!--main start-->
    <!-- ECharts模块化单文件引入 -->
    <script src="resources/js/echarts/echarts.js"></script>

    <#nested>
<!--main end-->
</#macro>


<#macro layoutFooter>
<script type="text/javascript" src="/resources/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="/resources/js/semantic.min.js"></script>

    <#nested>

</body>
</html>
</#macro>
