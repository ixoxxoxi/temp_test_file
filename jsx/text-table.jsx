import React from 'react';
import { Table } from 'antd';

const data = [
  { region: 'region_1', area: 'a', lasttwoyear: 20, lastoneyear: 10 },
  { region: 'region_1', area: 'b', lasttwoyear: 30, lastoneyear: 10 },
  { region: 'region_1', area: 'c', lasttwoyear: 20, lastoneyear: 15 },
  { region: 'region_2', area: 'c', lasttwoyear: 20, lastoneyear: 15 },
  { region: 'region_3', area: 'c', lasttwoyear: 20, lastoneyear: 15 },
  { region: 'region_3', area: 'c', lasttwoyear: 25, lastoneyear: 15 },
];

// 处理数据，计算 rowSpan
const getMergedData = () => {
  const map = new Map();
  
  data.forEach((item, index) => {
    if (!map.has(item.region)) {
      map.set(item.region, {
        startIndex: index,
        count: 1,
      });
    } else {
      const info = map.get(item.region);
      info.count++;
    }
  });
  
  return data.map((item, index) => {
    const info = map.get(item.region);
    return {
      ...item,
      rowSpan: index === info.startIndex ? info.count : 0,
    };
  });
};

const mergedData = getMergedData();

const columns = [
  {
    title: '区域',
    dataIndex: 'region',
    key: 'region',
    render: (text, record) => {
      const obj = {
        children: text,
        props: {},
      };
      if (record.rowSpan) {
        obj.props.rowSpan = record.rowSpan;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj;
    },
  },
  {
    title: '地区',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '前年数据',
    dataIndex: 'lasttwoyear',
    key: 'lasttwoyear',
  },
  {
    title: '去年数据',
    dataIndex: 'lastoneyear',
    key: 'lastoneyear',
  },
];

const App = () => (
  <Table columns={columns} dataSource={mergedData} rowKey="key" />
);

export default App;