export default {
  'GET /api/menus': {
    data: [
      {
        id: 1,
        name: '仪表盘',
        path: '/dashboard',
        icon: 'dashboard',
        sort: 1,
        enabled: 1,
        createdAt: '2022-12-06T05:00:57.040Z',
        children: [
          {
            id: 2,
            name: '分析页',
            path: '/dashboard/analysis',
            icon: 'smile',
            sort: 1,
            enabled: 1,
            createdAt: '2022-12-06T05:00:57.040Z',
          },
          {
            id: 3,
            name: '监控页',
            path: '/dashboard/monitor',
            icon: 'smile',
            sort: 2,
            enabled: 1,
            createdAt: '2022-12-06T05:00:57.040Z',
          },
        ],
      },
      {
        id: 4,
        name: '表单页',
        path: '/form',
        icon: 'form',
        sort: 2,
        enabled: 1,
        createdAt: '2022-12-06T05:00:57.040Z',
      },
    ],
  },
  'GET /api/menus/tree': {
    data: [
      {
        value: 1,
        title: '仪表盘',
        children: [
          {
            value: 2,
            title: '分析页',
          },
          {
            value: 3,
            title: '监控页',
          },
        ],
      },
      {
        value: 4,
        title: '表单页',
      },
    ],
  },
};
