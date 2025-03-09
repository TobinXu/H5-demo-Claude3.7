import { useState } from 'react';
import { Avatar, Typography, List, Button, Badge, Card, Divider, Space, Tag } from 'antd';
import { UserOutlined, SettingOutlined, HeartOutlined, StarOutlined, ShoppingOutlined, BellOutlined } from '@ant-design/icons';
import './style.css';

const { Title, Paragraph, Text } = Typography;

interface UserInfo {
  avatar?: string;
  nickname: string;
  level: number;
  points: number;
}

const Profile = () => {
  // 模拟用户数据
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '用户昵称',
    level: 3,
    points: 1250
  });

  // 模拟订单数据
  const orderCounts = {
    pending: 2,
    shipping: 1,
    received: 0,
    review: 3
  };

  // 功能列表
  const functionList = [
    {
      title: '我的收藏',
      icon: <StarOutlined />,
      badge: 6
    },
    {
      title: '我的关注',
      icon: <HeartOutlined />,
      badge: 8
    },
    {
      title: '浏览历史',
      icon: <ShoppingOutlined />,
      badge: 0
    },
    {
      title: '消息通知',
      icon: <BellOutlined />,
      badge: 3
    }
  ];

  // 设置列表
  const settingList = [
    { title: '个人资料设置' },
    { title: '收货地址管理' },
    { title: '账号与安全' },
    { title: '隐私设置' },
    { title: '关于我们' }
  ];

  return (
    <div className="profile-container">
      {/* 用户信息卡片 */}
      <Card className="user-card">
        <div className="user-info">
          <Avatar 
            size={64} 
            icon={<UserOutlined />} 
            src={userInfo.avatar}
            className="user-avatar"
          />
          <div className="user-details">
            <Title level={4}>{userInfo.nickname}</Title>
            <Space>
              <Tag color="gold">Lv.{userInfo.level}</Tag>
              <Text>积分: {userInfo.points}</Text>
            </Space>
          </div>
        </div>
        <Button type="primary" className="edit-profile-btn">编辑资料</Button>
      </Card>

      {/* 我的订单 */}
      <Card title="我的订单" extra={<Text className="view-all">查看全部</Text>} className="order-card">
        <div className="order-status">
          <div className="status-item">
            <Badge count={orderCounts.pending} overflowCount={99}>
              <div className="status-icon pending" />
            </Badge>
            <Text>待付款</Text>
          </div>
          <div className="status-item">
            <Badge count={orderCounts.shipping} overflowCount={99}>
              <div className="status-icon shipping" />
            </Badge>
            <Text>待发货</Text>
          </div>
          <div className="status-item">
            <Badge count={orderCounts.received} overflowCount={99}>
              <div className="status-icon received" />
            </Badge>
            <Text>待收货</Text>
          </div>
          <div className="status-item">
            <Badge count={orderCounts.review} overflowCount={99}>
              <div className="status-icon review" />
            </Badge>
            <Text>待评价</Text>
          </div>
        </div>
      </Card>

      {/* 常用功能 */}
      <Card title="常用功能" className="function-card">
        <div className="function-grid">
          {functionList.map((item, index) => (
            <div key={index} className="function-item">
              <Badge count={item.badge} overflowCount={99}>
                <div className="function-icon">{item.icon}</div>
              </Badge>
              <Text>{item.title}</Text>
            </div>
          ))}
        </div>
      </Card>

      {/* 设置列表 */}
      <Card title="设置" className="setting-card">
        <List
          itemLayout="horizontal"
          dataSource={settingList}
          renderItem={(item) => (
            <List.Item actions={[<SettingOutlined />]}>
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </Card>

      <div className="logout-container">
        <Button danger block>退出登录</Button>
      </div>
    </div>
  );
};

export default Profile;