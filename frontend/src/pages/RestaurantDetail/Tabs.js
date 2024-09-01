import React from 'react'
import { ConfigProvider, Tabs } from 'antd';
import MenuItem from '../../components/menu/MenuItem';
import ReviewSection from '../../components/review/ReviewSection';
import About from '../../components/about/About';

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Category',
        children: <MenuItem />,
    },
    {
        key: '2',
        label: 'About',
        children: <About />,
    },
    {
        key: '3',
        label: 'Review',
        children: <ReviewSection />,
    },
];

function RestraurantTabs() {
    return (
        <div>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemColor: 'rgba(255, 255, 255)',
                            itemSelectedColor: "#ff0000",
                            inkBarColor: "#ff0000",
                            itemHoverColor: "#ff0000"
                            /* here is your component tokens */
                        },
                    },
                }}
            >
                <Tabs defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                />
            </ConfigProvider>
        </div>
    )
}

export default RestraurantTabs