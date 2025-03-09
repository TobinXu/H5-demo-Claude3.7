import { useState } from 'react';
import { Button, Layout, Typography, Space, Tabs } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import viteLogo from '/vite.svg';
import './App.css';

// 导入页面组件
import Home from './pages/Home';
import Profile from './pages/Profile';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // 页面内容
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white shadow-md">
        <div className="flex items-center">
          <img src={viteLogo} alt="Logo" className="h-8 w-8 mr-2" />
          <Title level={4} className="m-0">H5 Demo</Title>
        </div>
        <Space>
          <Button type="primary">登录</Button>
          <Button>注册</Button>
        </Space>
      </Header>
      
      <Content className="bg-gray-50 flex-1 pb-12">
        {renderContent()}
      </Content>
      
      <Footer className="p-0 bg-white border-t fixed bottom-0 left-0 right-0 z-10">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'home',
              label: (
                <div className="flex flex-col items-center py-1">
                  <HomeOutlined style={{ fontSize: '20px' }} />
                  <span>首页</span>
                </div>
              ),
            },
            {
              key: 'profile',
              label: (
                <div className="flex flex-col items-center py-1">
                  <UserOutlined style={{ fontSize: '20px' }} />
                  <span>我的</span>
                </div>
              ),
            },
          ]}
        />
      </Footer>
    </Layout>
  );
}

export default App
