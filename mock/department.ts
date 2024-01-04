export default {
  'GET /api/departments/tree': {
    success: true,
    data: [
      {
        id: '1',
        name: '总经办',
        parentId: '0',
        sort: 1,
        enabled: 0,
        children: [
          {
            id: '1-1',
            name: '总经理',
            parentId: '1',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '1-1-1',
                name: '助理',
                parentId: '1-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '1-2',
            name: '副总经理',
            parentId: '1',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '1-2-1',
                name: '助理',
                parentId: '1-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: '财务部',
        parentId: '0',
        sort: 2,
        enabled: 1,
        children: [
          {
            id: '2-1',
            name: '财务经理',
            parentId: '2',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '2-1-1',
                name: '助理',
                parentId: '2-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '2-2',
            name: '会计',
            parentId: '2',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '2-2-1',
                name: '助理',
                parentId: '2-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        name: '人事部',
        parentId: '0',
        sort: 3,
        enabled: 1,
        children: [
          {
            id: '3-1',
            name: '人事经理',
            parentId: '3',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '3-1-1',
                name: '助理',
                parentId: '3-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '3-2',
            name: '人事专员',
            parentId: '3',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '3-2-1',
                name: '助理',
                parentId: '3-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name: '市场部',
        parentId: '0',
        sort: 4,
        enabled: 1,
      },
    ],
  },
  'GET /api/departments': {
    success: true,
    data: [
      {
        id: '1',
        name: '总经办',
        parentId: '0',
        sort: 1,
        enabled: 0,
        children: [
          {
            id: '1-1',
            name: '总经理',
            parentId: '1',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '1-1-1',
                name: '助理',
                parentId: '1-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '1-2',
            name: '副总经理',
            parentId: '1',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '1-2-1',
                name: '助理',
                parentId: '1-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '2',
        name: '财务部',
        parentId: '0',
        sort: 2,
        enabled: 1,
        children: [
          {
            id: '2-1',
            name: '财务经理',
            parentId: '2',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '2-1-1',
                name: '助理',
                parentId: '2-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '2-2',
            name: '会计',
            parentId: '2',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '2-2-1',
                name: '助理',
                parentId: '2-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        name: '人事部',
        parentId: '0',
        sort: 3,
        enabled: 1,
        children: [
          {
            id: '3-1',
            name: '人事经理',
            parentId: '3',
            sort: 1,
            enabled: 1,
            children: [
              {
                id: '3-1-1',
                name: '助理',
                parentId: '3-1',
                sort: 1,
                enabled: 1,
              },
            ],
          },
          {
            id: '3-2',
            name: '人事专员',
            parentId: '3',
            sort: 2,
            enabled: 1,
            children: [
              {
                id: '3-2-1',
                name: '助理',
                parentId: '3-2',
                sort: 1,
                enabled: 1,
              },
            ],
          },
        ],
      },
      {
        id: '4',
        name: '市场部',
        parentId: '0',
        sort: 4,
        enabled: 1,
      },
    ],
  },
};
