import React, { useState, memo } from 'react';
import {
  createRenderTracker,
  useRenderTracker,
  useAdvancedRenderTracker,
  useConditionalRenderTracker,
} from '@/utils/performance';

// 1️⃣ 使用 createRenderTracker 的示例
const trackParentRender = createRenderTracker('父组件');

// 2️⃣ 使用 memo + 渲染追踪的子组件
const ChildComponent = memo(function ChildComponent({ count }: { count: number }) {
  useRenderTracker('子组件'); // 自动追踪每次渲染

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h3>子组件 - Count: {count}</h3>
    </div>
  );
});

// 3️⃣ 使用高级追踪的组件
function AdvancedTrackingComponent({ data, filter }: { data: any[]; filter: string }) {
  // 追踪依赖变化和渲染原因
  const renderCount = useAdvancedRenderTracker('高级追踪组件', [data, filter]);

  return (
    <div className="p-4 bg-green-100 rounded">
      <h3>高级追踪组件 (第{renderCount}次渲染)</h3>
      <p>数据量: {data.length}</p>
      <p>过滤条件: {filter}</p>
    </div>
  );
}

// 4️⃣ 条件性追踪组件
function ConditionalTrackingComponent() {
  useConditionalRenderTracker('条件追踪组件'); // 只在开发环境追踪

  return (
    <div className="p-4 bg-yellow-100 rounded">
      <h3>条件追踪组件</h3>
      <p>只在开发环境显示渲染日志</p>
    </div>
  );
}

// 主测试组件
export default function PerformanceTestComponent() {
  // 手动调用渲染追踪
  trackParentRender();

  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');
  const [data, setData] = useState([1, 2, 3]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">性能追踪工具演示</h2>

      {/* 控制按钮 */}
      <div className="flex gap-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          增加计数 ({count})
        </button>

        <button
          onClick={() => setFilter((f) => f + 'x')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          修改过滤器 ({filter})
        </button>

        <button
          onClick={() => setData((d) => [...d, d.length + 1])}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          添加数据 ({data.length}项)
        </button>
      </div>

      {/* 演示组件 */}
      <div className="grid grid-cols-2 gap-4">
        <ChildComponent count={count} />
        <AdvancedTrackingComponent data={data} filter={filter} />
        <ConditionalTrackingComponent />

        <div className="p-4 bg-gray-100 rounded">
          <h3>性能监控说明</h3>
          <ul className="text-sm space-y-1">
            <li>• 打开浏览器控制台查看渲染日志</li>
            <li>• 点击按钮观察不同组件的渲染行为</li>
            <li>• memo 组件只在 props 变化时渲染</li>
            <li>• 高级追踪会显示渲染原因</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/*
🔍 控制台输出示例：

🔄 父组件 渲染次数: 1
🔄 子组件 渲染次数: 1
🔄 高级追踪组件 第1次渲染 | 原因: 初始渲染 | 距上次: 0ms
🔄 条件追踪组件 渲染次数: 1

// 点击"增加计数"后：
🔄 父组件 渲染次数: 2
🔄 子组件 渲染次数: 2
🔄 高级追踪组件 第2次渲染 | 原因: 未知原因 | 距上次: 1250ms

// 点击"修改过滤器"后：
🔄 父组件 渲染次数: 3
🔄 高级追踪组件 第3次渲染 | 原因: 依赖变化: 1个 | 距上次: 890ms
*/
