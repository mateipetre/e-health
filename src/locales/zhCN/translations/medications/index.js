// eslint-disable-next-line import/no-anonymous-default-export
export default {
  medications: {
    label: '药物治疗',
    filterTitle: '按状态过滤',
    search: '搜索药物',
    status: {
      draft: '草案',
      active: '活性',
      onHold: '等候接听',
      cancelled: '取消',
      completed: '已完成',
      enteredInError: '输入错误',
      stopped: '已停止',
      unknown: '未知',
    },
    intent: {
      proposal: '提案',
      plan: '计划',
      order: '订购',
      originalOrder: '原始订单',
      reflexOrder: '反射顺序',
      fillerOrder: '加油单',
      instanceOrder: '实例顺序',
      option: '选项',
    },
    priority: {
      routine: '常规',
      urgent: '紧急',
      asap: '尽快',
      stat: '统计',
    },
    filter: {
      all: '所有状态',
    },
    requests: {
      label: '药物要求',
      new: '要求药物',
      view: '查看药物',
      cancel: '取消药物',
      complete: '完全用药',
      error: {
        unableToRequest: '无法创建药物申请。',
        unableToComplete: '无法完成药物申请。',
        quantityRequired: '数量为必填项。',
        unitRequired: '必填单位。',
      },
    },
    medication: {
      medication: '药物',
      for: '对于',
      status: '状态',
      intent: '意图',
      priority: '优先',
      notes: '笔记',
      quantity: '数量',
      quantityValue: '值',
      quantityUnit: 'Unit',
      requestedOn: '要求开启',
      requestedBy: '被要求',
      completedOn: '完成于',
      canceledOn: '已取消',
      patient: '患者',
    },
  },
}
