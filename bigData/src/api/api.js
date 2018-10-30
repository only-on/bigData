import axios from './index'
import Qs from 'qs'
let base = '/sys'
// 种植户   省
export const getRegionProvice = params => { return axios.post(`${base}/soil/grower_province`, Qs.stringify(params)) }
// 种植户   市
export const getRegionCity = params => { return axios.post(`${base}/soil/grower_city`, Qs.stringify(params)) }
// 种植户   区
export const getRegionDiscount = params => { return axios.post(`${base}/soil/grower_area`, Qs.stringify(params)) }
// 用户综合卡片
export const getUserCart = params => { return axios.get(`${base}/user/get_usercount`, {params: params}) }
// 用户地图
export const getUsermap = params => { return axios.get(`${base}/user/get_user_map`, {params: params}) }
// 用户活跃度
export const getUserActitity = params => { return axios.get(`${base}/user/get_user_liveness`, {params: params}) }
// 用户种植作物
export const getUserPlant = params => { return axios.get(`${base}/user/get_yield_rank`, {params: params}) }
// 用户区域排行  检测页面
export const getUserAreaOrder = params => { return axios.get(`${base}/user/get_usercount_rank`, {params: params}) }
// 用户区域数量  用户统计
export const getUserArea = params => { return axios.get(`${base}/user/get_area_user_rank`, {params: params}) }
// 用户总数
export const getUserAll = params => { return axios.get(`${base}/user/get_user_rise`, {params: params}) }
// 用户列表
export const getUserList = params => { return axios.get(`${base}/user/listAll`, {params: params}) }
// 用户详情列表
// export const getUserDetailList = params => { return axios.get(`${base}/user/userDetail`, {params: params}) }
// 专家综合卡片
export const getExpertCart = params => { return axios.get(`${base}/expert/get_expertcount`, {params: params}) }
// 专家活跃度
export const getExpertOrderActivity = params => { return axios.get(`${base}/expert/get_liveness`, {params: params}) }
// 专家好评度排行
export const getExpertOrderGood = params => { return axios.get(`${base}/expert/get_grade`, {params: params}) }
// 专家按作物分类
export const getExpertCrop = params => { return axios.get(`${base}/expert/get_consistOfCrop`, {params: params}) }
// 专家分类
export const getExpertType = params => { return axios.get(`${base}/expert/get_composition`, {params: params}) }
// 专家区域热力地图
export const getExpertHotMap = params => { return axios.get(`${base}/expert/get_heating_map`, {params: params}) }
// 专家分布地图
export const getExpertMap = params => { return axios.get(`${base}/expert/get_expert_map`, {params: params}) }
// 专家列表
export const getExpertList = params => { return axios.get(`${base}/expert/get_expert_list`, {params: params}) }
// 商城综合卡片
export const getMallCart = params => { return axios.get(`${base}/order/get_count`, {params: params}) }
// 商城厂商订单销量
export const getMallCompany = params => { return axios.get(`${base}/order/get_order_company`, {params: params}) }
// 商城肥料占比
export const getMallFertilizer = params => { return axios.get(`${base}/order/get_order_product`, {params: params}) }
// 商城订单走势
export const getMallOrderForm = params => { return axios.get(`${base}/order/get_order_count`, {params: params}) }
// 商城订单排行
export const getMallOrder = params => { return axios.get(`${base}/order/get_order_rank`, {params: params}) }
// 商城订单销售区域地图
export const getMallAreaMap = params => { return axios.get(`${base}/order/get_order_district`, {params: params}) }
// 商城订单飞线地图
export const getMallFlyMap = params => { return axios.get(`${base}/order/get_order_flight`, {params: params}) }
// 监测中心综合卡片
export const getMonitorCart = params => { return axios.get(`${base}/home/get_count`, {params: params}) }
// 监测中心种植方案占比
export const getMonitorPlanPie = params => { return axios.get(`${base}/home/get_suggestion_sales`, {params: params}) }
// 监测中心覆盖面积排行表格
export const getMonitorTable = params => { return axios.get(`${base}/home/get_farmland`, {params: params}) }
// 监测中心用户总数
export const getMonitorUserAll = params => { return axios.get(`${base}/home/get_user_rise`, {params: params}) }
// 监测中心地图
export const getMonitorMap = params => { return axios.get(`${base}/home/get_farmland_spread`, {params: params}) }
// 监测中心解答率
export const getMonitorQuestion = params => { return axios.get(`${base}/home/get_solved_rate_city`, {params: params}) }
// 土壤标准下拉选择
export const soilStandardSelect = params => { return axios.post(`${base}/soil/standard_pull_list`, Qs.stringify(params)) }
// 土壤最近三次测量时间
export const soilTime = params => { return axios.post(`${base}/soil/block_soil_top3`, Qs.stringify(params)) }
// 土壤标准量
export const soilStandard = params => { return axios.post(`${base}/soil/standard_detail`, Qs.stringify(params)) }
// 土壤实际测量量
export const soil = params => { return axios.post(`${base}/soil/block_soil_detail`, Qs.stringify(params)) }
// 土壤施肥
export const soilDecision = params => { return axios.post(`${base}/soil/fertilization_suggest`, Qs.stringify(params)) }
// 获取种植户的园区列表
export const getBlockList = params => { return axios.get(`${base}/block/getBlockListByUserId`, {params: params}) }
// 获取园区下的种植信息
export const getOverview = params => { return axios.get(`${base}/block/getOverviewByblockId`, {params: params}) }
// 查看用户详情
export const userDeatil = params => { return axios.get(`${base}/user/get_user_detail_by_user_id`, {params: params}) }
// 决策中心 区域用户列表
export const userDecisionList = params => { return axios.post(`${base}/soil/grower_pull_list`, Qs.stringify(params)) }
// 决策中心 根据用户查询区域
export const userDecisionArea = params => { return axios.post(`${base}/soil/get_address`, Qs.stringify(params)) }
// 决策中心用户园区列表
export const userDecisionParkList = params => { return axios.get(`${base}/block/getBlockListByUserId`, {params: params}) }
// 决策中心用户详情
export const userDecisionDeatil = params => { return axios.get(`${base}/block/getDetailByBlockId`, {params: params}) }
// 土壤结果
export const soilDecisionResult = params => { return axios.post(`${base}/soil/contrast_result`, Qs.stringify(params)) }
// 决策中心标准量和实测量折线图
export const decisionCompare = params => { return axios.post(`${base}/soil/data_contrast`, Qs.stringify(params)) }
// 监控中心会员卡片
export const monitorVip = params => { return axios.get(`${base}/bigdata_center/member_count`, {params: params}) }
// 监控中心设备卡片
export const monitorDevice = params => { return axios.get(`${base}/bigdata_center/get_device_count`, {params: params}) }
// 监控中心覆盖作物
export const monitorCrop = params => { return axios.get(`${base}/bigdata_center/contain_crop`, {params: params}) }
// 监控中心农业资讯
export const monitorNews = params => { return axios.get(`${base}/bigdata_center/user_matter`, {params: params}) }
// 监控中心种植户地图分布
export const monitorUsers = params => { return axios.get(`${base}/bigdata_center/grower_distribute`, {params: params}) }
// 监控中心种植户  园区视频
export const monitorUsersVideo = params => { return axios.get(`${base}/bigdata_center/get_block_video_by_block_id`, {params: params}) }
// 监控中心种植户  农事追溯
export const monitorUsersFarm = params => { return axios.get(`${base}/bigdata_center/get_planting_log`, {params: params}) }
// 监控中心种植户  土壤对比
export const monitorUsersSoil = params => { return axios.get(`${base}/bigdata_center/get_soil_detail`, {params: params}) }
// 总览 用户和专家活跃度折线图
export const allUserActivity = params => { return axios.get(`${base}/user/get_user_active`, {params: params}) }
// 园区种植作物下拉列表
export const  cropPullList = params => { return axios.get(`${base}/block/crop_pull_list`, {params: params}) }
// 批次下拉列表
export const  planPullList = params => { return axios.get(`${base}/block/plant_pull_list`, {params: params}) }
// 农作物生长阶段
export const  cropGrow = params => { return axios.get(`${base}/block/crop_grow`, {params: params}) }
// 决策中心 推荐施肥方案
export const decisionPlan = params => { return axios.post(`${base}/soil/suggestion`, Qs.stringify(params)) }
// 决策中心 关键字搜索用户列表
export const decisionUserKey = params => { return axios.post(`${base}/soil/grower_search`, Qs.stringify(params)) }
// 用户 种植户列表
export const  userGrowing = params => { return axios.get(`${base}/user/getFarmerUserList`, {params: params}) }
// 用户 贸易商个人列表
// export const  userMallMan = params => { return axios.get(`${base}/user/getPersonTraderUserList`, {params: params}) }
// 用户 贸易商企业列表
export const  userMallsList = params => { return axios.get(`${base}/user/getTraderUserList`, {params: params}) }
// 用户 站长列表
export const  userManagerLsit = params => { return axios.get(`${base}/user/getStationUserList`, {params: params}) }
// 获取园区图片
export const  blockImage = params => { return axios.get(`${base}/block/get_block_image`, {params: params}) }
// 获取病虫害年份
export const  impairAnnual = params => { return axios.get(`${base}/block/get_impair_Annual`, {params: params}) }
// 获取病虫害
export const  getImpair = params => { return axios.get(`${base}/block/get_impair`, {params: params}) }
// 种植户收益年份下拉列表
export const  earnAnnualList = params => { return axios.get(`${base}/user_earn/annual_list`, {params: params}) }
// 单价对比
export const  unitPriceContrast = params => { return axios.get(`${base}/user_earn/unit_price_contrast`, {params: params}) }
// 品种收入对比
export const  varietyIncomeContrast = params => { return axios.get(`${base}/user_earn/variety_income_contrast`, {params: params}) }
// 总收入对比
export const  totalIncome = params => { return axios.get(`${base}/user_earn/total_income`, {params: params}) }
// 总利润对比
export const  totalProfit = params => { return axios.get(`${base}/user_earn/total_profit`, {params: params}) }
// 种植户详情  农事记录 作物下拉选择
export const  cropPullLists = params => { return axios.get(`${base}/plant/crop_pull_list`, {params: params}) }
// 种植户详情  农事记录 批次下拉选择
export const  batchPullLists = params => { return axios.get(`${base}/plant/batch_pull_list`, {params: params}) }
// 种植户详情  农事记录
export const  farmingRecordList = params => { return axios.get(`${base}/plant/log_list`, {params: params}) }
// 历史气象数据
export const  historyMeteor = params => { return axios.get(`${base}/meteorological/get_historical_meteorological_data`, {params: params}) }
// 实时气象数据
export const  realTimeMeteor = params => { return axios.get(`${base}/meteorological/get_now_meteorological_data`, {params: params}) }
// 贸易商详情  收购数量下拉框
export const tradeDetailNumberList = params => { return axios.post(`${base}/user/trader_detail_compare_pull`, Qs.stringify(params)) }
// 贸易商详情  收入下拉框
export const tradeDetailIncomeList = params => { return axios.post(`${base}/user/trader_income_compare_pull`, Qs.stringify(params)) }
// 贸易商详情  收购数量柱状图
export const tradeDetailBar = params => { return axios.post(`${base}/user/trader_purchase_compare`, Qs.stringify(params)) }
// 贸易商详情  收入折线图
export const tradeDetailLine = params => { return axios.post(`${base}/user/trader_income_compare`, Qs.stringify(params)) }
// 贸易商详情  个人详情
export const tradeDetailInformation = params => { return axios.get(`${base}/user/getPersonTraderUserDetails`, {params: params}) }
// 产品信息农作物下拉
export const  productCrop = params => { return axios.get(`${base}/reap_crop/crop_pull_list`, {params: params}) }
// 产品信息批次下拉
export const  productBatch = params => { return axios.get(`${base}/reap_crop/plant_pull_list`, {params: params}) }
// 产品详情
export const  productDetail = params => { return axios.get(`${base}/reap_crop/detail`, {params: params}) }
// 首页用户分布
export const  userDistribution = params => { return axios.get(`${base}/user/getUserNameAndAddressList`, {params: params}) }
// 用户  站长的会员列表
export const managerList = params => { return axios.post(`${base}/user/station_members`, Qs.stringify(params)) }
// 用户  站长的会员分布地图
export const managerListMap = params => { return axios.post(`${base}/user/station_members_distribute`, Qs.stringify(params)) }
// 站长详情
export const  managerDetail = params => { return axios.get(`${base}/user/getStationUserDetails`, {params: params}) }
// 企业贸易商详情
export const  tradeDetail = params => { return axios.get(`${base}/user/get_enterprise_trade_user_details`, {params: params}) }
// 用户数据统计收益年份下拉
export const  profitAnnual = params => { return axios.get(`${base}/user_earn/get_earn_annual`, {params: params}) }
// 用户数据统计收益作物下拉
export const  profitCrop = params => { return axios.get(`${base}/user_earn/get_earn_crop`, {params: params}) }
// 用户数据统计种植面积及收益分析
export const  profitCompare = params => { return axios.get(`${base}/user_earn/get_income_comparison`, {params: params}) }
// 用户数据统计用户群体分布图
export const  userGroup = params => { return axios.get(`${base}/user/get_user_distribution`, {params: params}) }
// 地块数据统计获取所有传感器
export const  allSensor= params => { return axios.get(`${base}/device/get_all_sensor`, {params: params}) }
// 地块数据统计卡片展示
export const  cardShow = params => { return axios.get(`${base}/block/get_card_data`, {params: params}) }
// 地块数据统计页面地图
export const  blockMap = params => { return axios.get(`${base}/block/get_block_data_map`, {params: params}) }
// 地块数据统计自动化地块面积排名
export const  isAutoArea = params => { return axios.get(`${base}/block/get_block_is_auto_area`, {params: params}) }
// 地块数据统计农作物下拉列表
export const  yieldCrop = params => { return axios.get(`${base}/block/get_acre_yield_pull_list`, {params: params}) }
// 地块数据统计地块产量柱状图
export const  blockAcre = params => { return axios.get(`${base}/block/get_block_acre_yield`, {params: params}) }
// 地块数据统计地块产量排行
export const  blockRank = params => { return axios.get(`${base}/plant/get_block_output_rank`, {params: params}) }
