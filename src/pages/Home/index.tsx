import { useState, useEffect, useRef } from 'react';
import { Card, Image, Typography, List, Spin, message } from 'antd';
import { useInfiniteQuery } from '@tanstack/react-query';
import './style.css';

const { Title, Paragraph } = Typography;

// 模拟商品数据接口
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

// 模拟获取商品数据的API
const fetchProducts = async ({ pageParam = 1 }): Promise<{ data: Product[], nextPage: number | null }> => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 每页商品数量
  const pageSize = 6;
  
  // 模拟商品数据
  const mockProducts = Array(20).fill(0).map((_, index) => ({
    id: `product-${index + 1}`,
    title: `商品 ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 10,
    description: `这是商品${index + 1}的详细描述，包含了商品的各种信息和特点。`,
    image: `https://picsum.photos/300/200?random=${index + 1}`,
  }));
  
  // 计算当前页的商品
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const pageData = mockProducts.slice(start, end);
  
  // 判断是否还有下一页
  const nextPage = end < mockProducts.length ? pageParam + 1 : null;
  
  return { data: pageData, nextPage };
};

const Home = () => {
  const [bannerImages] = useState([
    'https://picsum.photos/800/300?random=1',
    'https://picsum.photos/800/300?random=2',
    'https://picsum.photos/800/300?random=3',
  ]);
  
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 使用React Query处理无限滚动和下拉刷新
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
  
  // 轮播图自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [bannerImages.length]);
  
  // 处理下拉刷新
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    const threshold = 80; // 下拉阈值
    let isTouching = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      // 只有在页面顶部才触发下拉刷新
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isTouching = true;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      
      currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      
      // 下拉时显示刷新提示
      if (diff > 0 && diff < threshold && containerRef.current) {
        containerRef.current.style.transform = `translateY(${diff}px)`;
      }
    };
    
    const handleTouchEnd = async () => {
      if (!isTouching) return;
      isTouching = false;
      
      const diff = currentY - startY;
      
      // 如果下拉距离超过阈值，触发刷新
      if (diff > threshold && containerRef.current) {
        setIsRefreshing(true);
        containerRef.current.style.transform = 'translateY(0)';
        
        try {
          await refetch();
          message.success('刷新成功');
        } catch (error) {
          message.error('刷新失败，请重试');
        } finally {
          setIsRefreshing(false);
        }
      } else if (containerRef.current) {
        // 恢复原位
        containerRef.current.style.transform = 'translateY(0)';
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [refetch]);
  
  // 处理上拉加载更多
  useEffect(() => {
    const handleScroll = () => {
      // 检查是否滚动到底部附近
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  // 获取所有商品列表
  const products = data?.pages.flatMap(page => page.data) || [];
  
  return (
    <div className="home-container" ref={containerRef}>
      {isRefreshing && (
        <div className="refresh-indicator">
          <Spin size="small" />
          <span className="ml-2">刷新中...</span>
        </div>
      )}
      
      {/* Banner轮播图 */}
      <div className="banner-container relative mb-4">
        <div className="banner-slider" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
          {bannerImages.map((image, index) => (
            <div key={index} className="banner-slide">
              <Image
                src={image}
                alt={`Banner ${index + 1}`}
                className="banner-image"
                preview={false}
              />
            </div>
          ))}
        </div>
        <div className="banner-indicators">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`banner-indicator ${index === currentBanner ? 'active' : ''}`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>
      
      {/* 商品列表 */}
      <div className="products-container">
        <Title level={4} className="mb-4">热门商品</Title>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
              dataSource={products}
              renderItem={(product) => (
                <List.Item key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        alt={product.title}
                        src={product.image}
                        preview={false}
                        className="product-image"
                      />
                    }
                    className="product-card"
                  >
                    <Card.Meta
                      title={product.title}
                      description={
                        <>
                          <div className="product-price">¥{product.price}</div>
                          <Paragraph ellipsis={{ rows: 2 }}>
                            {product.description}
                          </Paragraph>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
            
            {/* 加载中提示 */}
            {isFetchingNextPage && (
              <div className="loading-container">
                <Spin size="small" />
                <span className="ml-2">加载中...</span>
              </div>
            )}
            
            {!hasNextPage && (
              <div className="no-more-container">
                <span>没有更多了</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;