import React from 'react';
import { ConfigProvider, Tabs } from 'antd';
import MenuItem from '../../components/menu/MenuItem';
import ReviewSection from '../../components/review/ReviewSection';
import About from '../../components/about/About';

// Handle tab changes
const onChange = (key) => {
  console.log('Selected Tab:', key);
};

function RestaurantTabs({ alignValue, setAlignValue, menuItems, restaurant }) {
  // Dynamically create the items array to include props
  const items = [
    {
      key: '1',
      label: 'Category',
      children: <MenuItem menuItems={menuItems} />, // Passing menuItems prop to MenuItem component
    },
    {
      key: '2',
      label: 'About',
      children: <About restaurant={restaurant} />, // Passing restaurant prop to About component
    },
    {
      key: '3',
      label: 'Review',
      children: <ReviewSection />, // Passing restaurant prop to ReviewSection component
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: 'rgba(255, 255, 255)',
              itemSelectedColor: '#ff0000',
              inkBarColor: '#ff0000',
              itemHoverColor: '#ff0000',
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default RestaurantTabs;
