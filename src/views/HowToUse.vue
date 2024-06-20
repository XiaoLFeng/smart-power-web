<script lang="ts">
import {defineComponent} from 'vue'
import {
  DashboardOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HighlightOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "HowToUse",
  components: {DashboardOutlined, HighlightOutlined, SettingOutlined, EyeOutlined, EditOutlined, DeleteOutlined},
  created() {
    document.title = '控制台 - 使用帮助';
  },
})
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="py-16 w-[800px]">
      <div class="h-full shadow shadow-indigo-100 rounded-lg bg-white p-8 grid gap-3">
        <div class="text-2xl flex items-center font-bold">
          <HighlightOutlined />
          <span class="ps-3">概要说明</span>
        </div>
        <div class="w-full grid gap-1">
          <div class="text-lg font-bold">你好哦</div>
          <div class="text-sm text-gray-500 grid gap-1">
            <span>你好哦，这里是使用帮助页面，你可以在这里找到你需要的帮助信息，如果你有任何问题，可以联系我们的客服人员(不是)。</span>
            <span>智电管家是一款基于 Golang(GoFrame) 框架的用电管理系统，使用 SqlServer 数据库进行数据存储和管理。</span>
            <span>这是一个数据库作业所制作的系统，作业的课题是：<b class="text-emerald-600">用电管理系统</b></span>
            <span>下面是本项目的 github 相关信息：</span>
            <span class="ps-7">后端地址：<a href="https://github.com/XiaoLFeng/SmartPower" class="transition text-blue-500 hover:text-blue-600">https://github.com/XiaoLFeng/SmartPower</a></span>
            <span class="ps-7">前端地址：<a href="https://github.com/XiaoLFeng/smart-power-web" class="transition text-blue-500 hover:text-blue-600">https://github.com/XiaoLFeng/smart-power-web</a></span>
            <span>下面，我将会教您如何使用本系统，以及对本系统有大概的了解。</span>
          </div>
          <div class="text-lg font-bold mt-3">课题描述</div>
          <div class="text-sm text-gray-500 grid gap-1">
            <span>课题名字：<b class="text-emerald-600">数据库技术设计题目（十一）： 用电管理系统</b></span>
            <span>系统名字：<b class="text-emerald-600">智电管家(SmartPower)</b></span>
            <span>作者：<a href="https://github.com/XiaoLFeng" class="transition font-bold text-cyan-500 hover:text-cyan-700">筱锋xiao_lfeng</a> (系统有开源在这里就不写真实名字了，该软件已申请软著，等待审核中)</span>
            <span>软件著作权流水号：2024R11L1435128</span>
            <span>基础数据表要求：</span>
            <span class="ps-7">用电企业（企业编号、企业名称、地址、电话、联系人）</span>
            <span class="ps-7">电费信息（谷价、峰价）</span>
            <span class="ps-7">用电情况（企业编号、谷电量、峰电量、年月、合计电量、合计电费）</span>
            <span>要求能够进行如下工作:</span>
            <span class="ps-7"><b>1.</b> 能够统计各个用电企业的月耗电量以及电费</span>
            <span class="ps-7"><b>2.</b> 能够统计查询各个企业的总的谷电量和峰电量</span>
            <span class="ps-7"><b>3.</b> 能够统计该地区的峰、谷电量比例以及电费情况</span>
            <span class="ps-7"><b>4.</b> 修改基础数据</span>
            <span class="ps-7"><b>5.</b> 用户分级管理，人机界面良好</span>
          </div>
          <div class="text-lg font-bold mt-3">版权说明</div>
          <div class="text-sm text-gray-500 grid gap-1">
            <span>&copy; 2016-2024 筱锋xiao_lfeng. All Rights Reserved. 版权所有</span>
            <span>开源请遵循 MIT 协议标准，若要商用请联系告知于我：<a class="transition text-blue-500 hover:text-blue-600" href="mailto:gm@x-lf.cn">gm@x-lf.cn</a></span>
            <span>本系统为学校作业，并非长期维护项目，若需进行生产服务，请慎重考虑，作者不会维修任何后期出现的问题。</span>
          </div>
        </div>
        <div class="text-2xl flex items-center font-bold mt-6">
          <SettingOutlined />
          <span class="ps-3">系统使用帮助</span>
        </div>
        <div class="text-lg font-bold mt-3">系统描述</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <span>该系统是一个使用多模块开发的用电管理系统。</span>
          <span class="ps-7"><b>1.</b> Golang[v1.22.2](GoFrame框架[v2.7.1])</span>
          <span class="ps-7"><b>2.</b> SQLServer[2022] -> 可选择其他版本 2017/2019</span>
          <span class="ps-7"><b>3.</b> Vue[v3.0.0]</span>
          <span class="ps-7"><b>4.</b> AntDesignVue[v4.x]</span>
          <span class="ps-7"><b>5.</b> TailwindCss[v3.4.4]</span>
        </div>
        <div class="text-lg font-bold mt-3">初始化配置</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <span>在系统准备之初，您需要对系统进行简单配置，连接数据库的操作。在数据库成功连接后即可，数据表等信息将会由系统自动进行初始化准备操作。</span>
          <span>为了保证您的数据库系统安全，请不要使用 sa 账户以及 master 数据库进行本系统的连接，请创建一位用户以及专门的数据库进行连接，且用户当且仅有该数据库的权限而不涉及其他表的权限。</span>
          <span>初始化后的管理员账户密码分别为 <b>admin, admin</b> 登录账号后，请尽快移步至 <b class="text-emerald-600">个人中心</b> 修改密码。</span>
        </div>
        <div class="text-lg font-bold mt-3">管理员使用</div>
        <div class="text-md font-medium mt-1">控制台使用</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/console-host.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>控制台是每一位管理员登录后立刻跳转到的位置，您可以在此看到当月电价，简易看板，以及历史电价信息。</span>
          <span>在右侧，会显示您的用户名信息以及按钮，其中左侧的按钮可以添加当月的电价信息，只有当电价信息创建后，其余企业用户才可以进行用电量的创建。</span>
          <span>而右侧的按钮将会为您跳转到可以修改个人基础信息的页面，在这里你可以简单修改个人信息。</span>
          <span class="text-red-400">在左侧菜单左下角，您可以点击头像，将会弹出登出显示。您可以点击确认后退出当前账号的登录操作。</span>
        </div>
        <div class="text-md font-medium mt-1">电费单价管理</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/console-rate.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>电费单价管理可以管理本系统中的每个月的电价，管理员可以对电价进行创建、修改、删除操作。</span>
          <span>在列表中，类似于 <EyeOutlined  class="text-lime-500"/> 的样式为详细信息查看，管理员可以点击该按钮查看所选择月份的详细电价信息以及其他未展示的配置信息。</span>
          <img src="@/assets/images/help/console-rate-see.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>右侧的 <EditOutlined  class="text-lime-500"/> 的样式为编辑按钮，用户可以点击后修改指定年月的电价信息。</span>
          <span>（请注意，已登记的信息不会随着修改而修改，请确保您创建的时候不要产生不必要的错误，在开发时联想到周期浮动来算，已经登记的属于你的周期浮动之前，所以没有做全局修改的策略。故，这个修改应当为价格波动后进行修改，而不是一段时间后发现价格出现问题而去修改。）</span>
          <img src="@/assets/images/help/console-rate-edit.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span class="text-red-400">倘若您真的创建出错误的价格，并且许多企业以及进行登记，我们也制作了对应的措施，您可以点击 <DeleteOutlined  class="text-lime-500"/> 按钮对指定周期进行删除，删除按钮将会再弹出提示框确认您是否需要删除。</span>
          <span class="text-red-400">若您确认需要进行删除，那么点击 <b>确定</b> 后，将会删除指定周期的单价信息，并且将会把所有企业已创建的账单一并删除。</span>
          <span>届时，您可以重新创建指定周期的单价，重新通知企业进行创建价格。</span>
          <img src="@/assets/images/help/console-rate-delete.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
        </div>
        <div class="text-md font-medium mt-1">电费区域计算</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/console-calc.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <img src="@/assets/images/help/console-calc-select.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>在左侧导航栏中，点击“电费区域计算”，进入电费区域计算页面。</span>
          <span class="ps-7"><b>输入区域名称：</b>在“区域查询”部分的输入框中输入您要查询的区域名称，例如“深圳”。</span>
          <span class="ps-7"><b>选择日期范围：</b>点击日期选择器，选择您要查询的起始日期和结束日期。</span>
          <span class="ps-7"><b>点击查询按钮：</b>点击“区域查询电价”按钮，系统将根据您输入的区域和日期范围进行查询。</span>
          <span>查看查询结果</span>
          <span class="ps-7"><b>区域总体清单：</b>在“区域总体清单”部分，您可以看到当前查询的基本信息，包括查询时间范围和选择的区域。还可以看到该区域的电费和电量统计信息，包括谷开销、峰开销等。</span>
          <span class="ps-7"><b>区域详细清单：</b>在“区域详细清单”部分，您可以查看详细的企业电费和电量信息，包括：</span>
          <span class="ps-14">· 统一信用代码</span>
          <span class="ps-14">· 企业名称</span>
          <span class="ps-14">· 谷用电、峰用电</span>
          <span class="ps-14">· 谷开销、峰开销</span>
          <span class="ps-14">· 总计用电、总计开销</span>
        </div>
        <div class="text-md font-medium mt-1">电费区域计算</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/console-user.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>在左侧导航栏中，点击“用户管理”，进入用户管理页面。</span>
          <span>在用户列表部分，您可以查看系统中所有用户的信息，包括：</span>
          <span class="ps-7"><b>用户名：</b>用户的名称。</span>
          <span class="ps-7"><b>邮箱：</b>用户的邮箱地址。</span>
          <span class="ps-7"><b>手机号：</b>用户的联系电话。</span>
          <span class="ps-7"><b>角色：</b>用户在系统中的角色（例如 user 或 admin）。</span>
          <span class="ps-7"><b>操作：</b>对用户的操作。</span>
          <span class="ps-14">在操作中第一个按钮为查看按钮，您可以查询用户除了密码的详细信息。</span>
          <span class="ps-14">在操作中第二个按钮为编辑按钮，您可以修改用户出了密码的基本信息。</span>
          <span class="ps-14">在操作中第三个按钮为强制修改密码，您可以点击后自动创建一个新的用户密码，重新创建后密码将会显示在右上角部分维持显示 <b>4.5</b> 秒</span>
        </div>
        <div class="text-lg font-bold mt-3">用户使用</div>
        <div class="text-md font-medium mt-1">控制台使用</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/user-dashboard.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>在当前页面中，为普通用户登陆后显示的内容。该页面内容将会展示当月的单位价格的电费信息。在下方可以看到历史创建电价的信息。</span>
          <span>在右侧分区，会显示您的基本信息，以及该要统计。下方按钮分别为 <b>创建电价</b> 和 <b>编辑信息</b></span>
          <span class="ps-7">创建电价：点击按钮将会打开新的界面创建当月电价。</span>
          <span class="ps-7">编辑信息：点击按钮将会跳转到个人信息的编辑页面。</span>
          <span>左侧菜单中，类似于控制台图标 <DashboardOutlined class="text-lime-500"/> 将鼠标放之后，将会显示二级菜单</span>
          <img src="@/assets/images/help/user-menu.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
        </div>
        <div class="text-md font-medium mt-1">电费操作</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/user-electricity.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span>在“操作”列中，您可以对电费明细进行以下操作：</span>
          <span class="ps-7"><b>查看：</b>查看详细的配置信息</span>
          <span class="ps-7"><b>编辑：</b>编辑用电量配置信息，编辑后将会自动按照最新的价格表进行计算金额</span>
          <span class="ps-7"><b>删除：</b>删除指定周期的配电信息</span>
          <img src="@/assets/images/help/user-electricity-select.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <img src="@/assets/images/help/user-electricity-edit.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <img src="@/assets/images/help/user-electricity-delete.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
          <span class="ps-7">创建电费：点击按钮，可以创建新的电费记录。</span>
          <span class="ps-7">补充创建：点击按钮，可以补充创建电费记录。</span>
          <span class="ps-7">通过周期时间查询：点击按钮，可以通过输入周期时间进行电费明细的查询。</span>
        </div>
        <div class="text-md font-medium mt-1">电价概览</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/user-rate.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
        </div>
        <div class="text-md font-medium mt-1">账户帮助</div>
        <div class="text-sm text-gray-500 grid gap-1">
          <img src="@/assets/images/help/user-account.png" alt="" class="transition w-auto mb-1 shadow-sm hover:shadow-xl active:scale-150 rounded-xl">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
