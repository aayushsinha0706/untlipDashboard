import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Wallet, 
  HelpCircle, 
  MessageSquare, 
  LogOut,
  Calendar,
  Package,
  DollarSign,
  Activity,
  Menu,
  Search,
  Bell,
  X
} from 'lucide-react';

type OrderStatus = 'Delivered' | 'Cancelled' | 'Pending';
type TabType = 'All Orders' | 'Pending Orders' | 'Delivered Orders' | 'Booked Orders' | 'Cancelled Orders';

interface Order {
  id: string;
  date: string;
  product: string;
  price: number;
  status: OrderStatus;
}

const Orders: Order[] = [
  { id: '#123245', date: '14-12-2020', product: 'Decorative box', price: 125, status: 'Delivered' },
  { id: '#678457', date: '13-12-2020', product: 'Plantation box', price: 120, status: 'Cancelled' },
  { id: '#123245', date: '12-12-2020', product: 'Camera film', price: 156, status: 'Delivered' },
  { id: '#123245', date: '12-12-2020', product: 'Camera film', price: 156, status: 'Delivered' },
  { id: '#87245', date: '10-12-2020', product: 'Visual lace', price: 125, status: 'Delivered' },
  { id: '#273245', date: '11-11-2020', product: 'Decorative box', price: 180, status: 'Pending' },
  { id: '#789245', date: '10-11-2020', product: 'Decorative box', price: 190, status: 'Delivered' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: ShoppingBag, label: 'Orders', active: true },
    { icon: Users, label: 'Clients', active: false },
    { icon: BarChart3, label: 'Statistics', active: false },
    { icon: Wallet, label: 'Finance', active: false },
    { icon: HelpCircle, label: 'FAQ', active: false },
    { icon: MessageSquare, label: 'Support', active: false },
    { icon: LogOut, label: 'Log Out', active: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 lg:w-56 bg-white p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Menu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">untlip</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                item.active
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <UpgradeCard />
      </aside>
    </>
  );
};

const UpgradeCard: React.FC = () => (
  <div className="mt-auto">
    <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl p-4 mb-4">
      <div className="w-24 h-24 mx-auto mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-xs">Support</div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">Upgrade</h3>
      <p className="text-sm text-gray-600 mb-2">your plan →</p>
    </div>
  </div>
);

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
  <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
      <Calendar className="w-5 h-5 text-indigo-600" />
      <span className="text-gray-700 font-medium text-sm sm:text-base">October 19, 2021</span>
    </div>
    
    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
      <div className="relative flex-1 sm:flex-initial">
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 md:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-lg relative">
        <Bell className="w-5 h-5 text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
      </button>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-semibold relative">
        U
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
    </div>
  </header>
);

interface OrdersHeaderProps {
  activeView: 'Daily' | 'Monthly';
  onViewChange: (view: 'Daily' | 'Monthly') => void;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ activeView, onViewChange }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
    <div className="flex items-center gap-3">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Orders</h1>
      <span className="text-xl sm:text-2xl">😍</span>
    </div>
    <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
      <button
        onClick={() => onViewChange('Daily')}
        className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
          activeView === 'Daily'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        Daily
      </button>
      <button
        onClick={() => onViewChange('Monthly')}
        className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
          activeView === 'Monthly'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        Monthly
      </button>
    </div>
  </div>
);

interface StatCardProps {
  title: string;
  value: number;
  percentage: number;
  bgColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, bgColor, textColor }) => (
  <div className={`${bgColor} rounded-2xl p-4 md:p-6`}>
    <h3 className="text-gray-600 font-medium mb-2 text-sm md:text-base">{title}</h3>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textColor}`}>{value}</span>
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="text-gray-600">Impression</span>
        <span className="text-gray-400">·</span>
        <span className="font-semibold">{percentage}%</span>
        <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
      </div>
    </div>
  </div>
);

const StatsCards: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
    <StatCard
      title="New Orders"
      value={245}
      percentage={20}
      bgColor="bg-blue-50"
      textColor="text-blue-600"
    />
    <StatCard
      title="Pending Orders"
      value={123}
      percentage={11}
      bgColor="bg-purple-50"
      textColor="text-purple-600"
    />
    <StatCard
      title="Delivered Orders"
      value={150}
      percentage={18}
      bgColor="bg-orange-50"
      textColor="text-orange-600"
    />
  </div>
);

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['All Orders', 'Pending Orders', 'Delivered Orders', 'Booked Orders', 'Cancelled Orders'];

  return (
    <div className="mb-6 border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-4 md:gap-6 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-3 font-medium transition relative whitespace-nowrap text-sm md:text-base ${
              activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'Delivered':
      return 'text-green-600';
    case 'Cancelled':
      return 'text-red-600';
    case 'Pending':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

const StatusIcon: React.FC<{ status: OrderStatus }> = ({ status }) => (
  <div className={`flex items-center gap-2 ${getStatusColor(status)}`}>
    <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
      {status === 'Delivered' && <div className="w-2 h-2 rounded-full bg-current"></div>}
      {status === 'Cancelled' && <div className="text-xs">×</div>}
      {status === 'Pending' && <div className="w-2 h-2 rounded-full bg-current"></div>}
    </div>
    <span className="font-medium text-sm">{status}</span>
  </div>
);

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
    {/* Desktop Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4" />
                Order ID
              </div>
            </th>
            <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Ordered Date
              </div>
            </th>
            <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                Product Name
              </div>
            </th>
            <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Product Price
              </div>
            </th>
            <th className="text-left py-4 px-4 lg:px-6 text-gray-600 font-semibold text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Status
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={`${order.id}-${index}`}
              className="border-b border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="py-4 px-4 lg:px-6 font-medium text-gray-900 text-sm">{order.id}</td>
              <td className="py-4 px-4 lg:px-6 text-gray-600 text-sm">{order.date}</td>
              <td className="py-4 px-4 lg:px-6 text-gray-900 text-sm">{order.product}</td>
              <td className="py-4 px-4 lg:px-6 font-semibold text-gray-900 text-sm">{order.price} USD</td>
              <td className="py-4 px-4 lg:px-6">
                <StatusIcon status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="md:hidden divide-y divide-gray-100">
      {orders.map((order, index) => (
        <div key={`${order.id}-${index}`} className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="font-medium text-gray-900 mb-1">{order.id}</div>
              <div className="text-sm text-gray-600">{order.date}</div>
            </div>
            <StatusIcon status={order.status} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Product:</span>
              <span className="text-gray-900 font-medium">{order.product}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-900 font-semibold">{order.price} USD</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All Orders');
  const [activeView, setActiveView] = useState<'Daily' | 'Monthly'>('Daily');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <OrdersHeader activeView={activeView} onViewChange={setActiveView} />
        <StatsCards />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <OrdersTable orders={Orders} />
      </main>
    </div>
  );
};

export default App;