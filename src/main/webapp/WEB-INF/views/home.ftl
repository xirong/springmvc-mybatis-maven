<#include "common/_layout.ftl">
<@layoutHead title="网站"></@layoutHead>

<@layoutBody>
<!-- 这是nested的内容-->


<table class="ui table">
    <thead>
    <tr>
        <th>UserId</th>
        <th>Name</th>
        <th>Age</th>
        <th>Sex</th>
        <#--<th>CreateTime</th>-->
    </tr>
    </thead>
    <tbody>
        <#list userList as oneUser>
        <tr>
            <td>${oneUser.user_id}</td>
            <td>${oneUser.name}</td>
            <td>${oneUser.age}</td>
            <#if oneUser.sex==1>
                <td>女</td>
            <#else>
                <td>男</td>
            </#if>
            <#--<td>${oneUser.create_time}</td>-->
        </tr>
        </#list>
    </tbody>
</table>




</@layoutBody>

<@layoutFooter></@layoutFooter>