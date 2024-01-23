import { DataNode } from 'antd/lib/tree';
import { useEffect, useState } from 'react';

const useDepartmentsTree = (
  departmentsTreeApi: () => Promise<{ data: API.DepartmentListItem[] }>,
) => {
  const [departments, setDepartments] = useState<DataNode[]>([]);

  function formatTreeList(list: API.DepartmentListItem[]) {
    list.map((item) => {
      item.key = item.id;
      if (item['children']) {
        item.children = formatTreeList(item.children);
      }
      return item;
    });
    return list;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await departmentsTreeApi();
        setDepartments(formatTreeList(response.data ?? []) as DataNode[]);
      } catch (error) {
        console.error('Error fetching tree data:', error);
      }
    };

    fetchData().then();
  }, [departmentsTreeApi]);

  return departments;
};

export default useDepartmentsTree;
