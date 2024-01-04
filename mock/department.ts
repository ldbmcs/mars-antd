export default {
  'GET /api/departments/tree': {
    success: true,
    data: [
      {
        id: '1',
        title: '总经办',
        parentId: '0',
        children: [
          {
            id: '1-1',
            title: '总经理',
            parentId: '1',
            children: [
              {
                id: '1-1-1',
                title: '助理',
                parentId: '1-1',
              },
            ],
          },
          {
            id: '1-2',
            title: '副总经理',
            parentId: '1',
            children: [
              {
                id: '1-2-1',
                title: '助理',
                parentId: '1-2',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        title: '财务部',
        parentId: '0',
        children: [
          {
            id: '2-1',
            title: '财务经理',
            parentId: '2',
            children: [
              {
                id: '2-1-1',
                title: '助理',
                parentId: '2-1',
              },
            ],
          },
          {
            id: '2-2',
            title: '会计',
            parentId: '2',
            children: [
              {
                id: '2-2-1',
                title: '助理',
                parentId: '2-2',
              },
            ],
          },
        ],
      },
      {
        id: '3',
        title: '人事部',
        parentId: '0',
        children: [
          {
            id: '3-1',
            title: '人事经理',
            parentId: '3',
            children: [
              {
                id: '3-1-1',
                title: '助理',
                parentId: '3-1',
              },
            ],
          },
          {
            id: '3-2',
            title: '人事专员',
            parentId: '3',
            children: [
              {
                id: '3-2-1',
                title: '助理',
                parentId: '3-2',
              },
            ],
          },
        ],
      },
      {
        id: '4',
        title: '市场部',
        parentId: '0',
      },
    ],
  },
};
