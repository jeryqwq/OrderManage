const query = require('./../mysql/connect')
class UserController {
  async dashboard(ctx) {
    const toYearSum = await query("select sum(payment) as val from mmall_order where `status` >20 and YEAR(create_time)=YEAR(NOW())");
    const lastSum = await query("select sum(payment) as val from mmall_order where `status` >20 and YEAR(create_time)=YEAR(NOW())-1")
    const toYearOrderNum = await query("select count(*) as val from mmall_order where  YEAR(create_time)=YEAR(NOW())")
    const lastYearOrderNum = await query("select count(*) as val from mmall_order where  YEAR(create_time)=YEAR(NOW())-1")
    const toYearNoPayOrderNum = await query("select count(*) as val from mmall_order where `status`<=20 and YEAR(create_time)=YEAR(NOW())");
    const lastYearNoPayOrderNum = await query("select count(*) as val from mmall_order where `status`<=20 and YEAR(create_time)=YEAR(NOW())-1");
    const monthSaleInfos = await query("select count(*) as num,date_format(create_time,'%Y-%m')  as val from mmall_order  GROUP BY date_format(create_time,'%Y-%m')  ")
    // const selectYearMonthOrderNum=await query("select count(*) as val from mmall_order where date_format(create_time,'%Y')=2018 and date_format(create_time,'%m')=10")
    const aLiPayNum = await query("select count(*) as val from mmall_order where payment_type=1")
    const toMonthNewUser = await query("select count(*) as val from mmall_user where date_format(create_time,'%Y')=date_format(now(),'%Y') and date_format(create_time,'%m')=date_format(now(),'%m')")
    const newOrder = await query("select o.id,product_image,product_name,o.user_id,quantity,total_price,i.create_time,o.`status`  from mmall_order_item i,mmall_order o where i.order_no=o.order_no ORDER BY i.create_time desc  limit 0,9")
    const historyTop9 = await query("SELECT count(quantity) as num,p.`name`,category_id,main_image,c.`name` as cateName from mmall_product p ,mmall_order_item o,mmall_category c where o.product_id=p.id and p.category_id=c.id  GROUP BY o.product_id ORDER BY num DESC limit 0,9")
    const toYearEveryMonth = await query("select sum(payment),date_format(create_time,'%m') as mon from mmall_order where date_format(create_time,'%Y')=date_format(now(),'%Y')  GROUP BY date_format(create_time,'%m')")
    const categorySaleDate = await query("select sum(o.quantity)as total,o.id, product_name,c.`name` from mmall_order_item o,mmall_category c,mmall_product p  where o. product_id=p.id and p.category_id=c.id  GROUP BY c.id")
    const lastYearEveryMonth = await query("select sum(payment) as s,date_format(create_time,'%m') as mon from mmall_order where date_format(create_time,'%Y')=date_format(now(),'%Y')-1  GROUP BY date_format(create_time,'%m')")
    const everyMonthSale = await query("select sum(payment) as amount,date_format(create_time,'%Y-%m') as month from mmall_order   GROUP BY date_format(create_time,'%Y-%m')")
    //todo 组装工作台数据
    ctx.body = {
      toYearSum,
      lastSum,
      toYearOrderNum,
      lastYearOrderNum,
      toYearNoPayOrderNum,
      lastYearNoPayOrderNum,
      monthSaleInfos,
      aLiPayNum,
      toMonthNewUser,
      newOrder,
      historyTop9,
      toYearEveryMonth,
      categorySaleDate,
      lastYearEveryMonth,
      everyMonthSale
    };
  }

  async orderInfos(ctx) {
    const orderNum = await query("SELECT count(*) as val from mmall_order ")
    const successOrderNum = await query("SELECT count(*) as val from mmall_order where `status`>=40")
    const orderUserNum = await query("SELECT count(DISTINCT u.id )  as val from mmall_order o,mmall_user u  where u.id=o.user_id ")
    const successUserNum = await query("SELECT count(DISTINCT u.id )  as val from mmall_order o,mmall_user u  where o.status>=40 and u.id=o.user_id ")
    const orderSumTotal = await query("select SUM(payment) as val from mmall_order where `status`>20")
    const successSumTotal = await query("select SUM(payment)  as val from mmall_order where `status`>40")
    const everyMonth = await query("select count(id) as A,date_format(create_time,'%Y-%m') as year from mmall_order   GROUP BY date_format(create_time,'%Y-%m')")
    ctx.body = {
      orderNum: [{
          title: '订单数',
          value: orderNum[0].val
        },
        {
          title: '交易成功订单数',
          value: successOrderNum[0].val,
        },
        {
          title: '订货客户数',
          value: orderUserNum[0].val,
        },
        {
          title: '交易成功客户数',
          value: successUserNum[0].val,
        },
        {
          title: '订货总金额',
          value: `￥${orderSumTotal[0].val}`,
        },
        {
          title: '交易成功总金额',
          value: `￥${successSumTotal[0].val}`,
        }
      ],
      everyMonth,

    }
  }

  async disPatch(ctx) {
    const disPatchNum = await query("SELECT count(*) as val from mmall_order where `status`>=30")
    const disPatchGoods = await query("SELECT count(*) as val from mmall_order o,mmall_order_item i where `status`>=30 and o.order_no=i.order_no")
    const disPatchPrice = await query("SELECT sum(payment) as val from mmall_order  where `status`>=30 ")
    ctx.body = [{
        title: '发货单数',
        value: disPatchNum[0].val,
        background: '#58ca9a'
      },
      {
        title: '发货商品数',
        value: disPatchGoods[0].val,
        background: '#f7da47',
      },
      {
        title: '总金额',
        value: `￥ ${disPatchPrice[0].val}`,
        background: '#ee706d',
      }
    ]
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
