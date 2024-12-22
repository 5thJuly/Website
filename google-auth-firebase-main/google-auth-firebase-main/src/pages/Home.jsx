import React, { useState } from 'react';
import { Star, Moon, Sun, Rocket, Sparkle, CloudMoon } from 'lucide-react';

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      id: 1,
      name: 'Sao Thủy',
      icon: Sparkle,
      description: 'Hành tinh nhỏ nhất và gần Mặt Trời nhất',
      color: 'from-orange-400 to-yellow-600',
      facts: ['Nhiệt độ bề mặt có thể lên tới 430°C', 'Không có vệ tinh tự nhiên', 'Chu kỳ quay quanh Mặt Trời ngắn nhất']
    },
    {
      id: 2,
      name: 'Sao Kim',
      icon: CloudMoon,
      description: 'Hành tinh nóng nhất trong hệ Mặt Trời',
      color: 'from-yellow-400 to-orange-600',
      facts: ['Được gọi là "chị em" của Trái Đất', 'Quay ngược chiều với các hành tinh khác', 'Có bầu khí quyển dày đặc']
    },
    {
      id: 3,
      name: 'Trái Đất',
      icon: Sun,
      description: 'Hành tinh xanh - Ngôi nhà của chúng ta',
      color: 'from-blue-400 to-green-600',
      facts: ['Hành tinh duy nhất đã biết có sự sống', '71% bề mặt là nước', 'Có một vệ tinh tự nhiên là Mặt Trăng']
    },
    {
      id: 4,
      name: 'Sao Hỏa',
      icon: Star,
      description: 'Hành tinh đỏ với bề mặt sa mạc',
      color: 'from-red-500 to-orange-600',
      facts: ['Có núi cao nhất trong hệ Mặt Trời', 'Có hai vệ tinh nhỏ', 'Có thể có dấu hiệu nước trong quá khứ']
    },
    {
      id: 5,
      name: 'Sao Mộc',
      icon: Moon,
      description: 'Hành tinh lớn nhất hệ Mặt Trời',
      color: 'from-orange-300 to-red-600',
      facts: ['Có vết đỏ lớn - một cơn bão kéo dài', 'Có hơn 79 vệ tinh', 'Có vành đai mờ nhạt']
    },
    {
      id: 6,
      name: 'Sao Thổ',
      icon: Star,
      description: 'Hành tinh với vành đai đẹp nhất',
      color: 'from-yellow-300 to-orange-400',
      facts: ['Vành đai gồm băng và đá', 'Mật độ nhỏ hơn nước', 'Có 82 vệ tinh đã được xác nhận']
    },
    {
      id: 7,
      name: 'Sao Thiên Vương',
      icon: Star,
      description: 'Hành tinh nghiêng với màu xanh lam nhạt',
      color: 'from-cyan-400 to-blue-600',
      facts: ['Quay nghiêng gần như vuông góc với quỹ đạo', 'Có gió mạnh nhất trong Hệ Mặt Trời', 'Nhiệt độ rất thấp']
    },
    {
      id: 8,
      name: 'Sao Hải Vương',
      icon: Star,
      description: 'Hành tinh xanh lam đậm, xa nhất Hệ Mặt Trời',
      color: 'from-indigo-500 to-blue-700',
      facts: ['Có bão lớn và mạnh', 'Có 14 mặt trăng đã biết', 'Mặt trăng Triton có quỹ đạo ngược chiều']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 4 + 2}
            className="absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Khám Phá Hệ Mặt Trời
        </h1>
        <p className="text-gray-300 text-center mb-12 text-lg">
          Hãy bắt đầu cuộc hành trình khám phá vũ trụ của bạn
        </p>

        {/* Planets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {planets.map(planet => {
            const PlanetIcon = planet.icon;
            return (
              <div
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 cursor-pointer hover:border-purple-500 transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${planet.color}`}>
                    <PlanetIcon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{planet.name}</h3>
                </div>
                <p className="text-gray-300 mb-4">{planet.description}</p>
                <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center space-x-1">
                  <span>Tìm hiểu thêm</span>
                  <Rocket size={14} className="rotate-90" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planet Detail Modal */}
      {selectedPlanet && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedPlanet(null)}>
          <div className="bg-gray-800/90 rounded-xl p-8 max-w-2xl w-full mx-4 border border-gray-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-4 rounded-full bg-gradient-to-r ${selectedPlanet.color}`}>
                <selectedPlanet.icon className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white">{selectedPlanet.name}</h2>
            </div>
            
            <p className="text-gray-300 mb-6 text-lg">{selectedPlanet.description}</p>

            {/* New Information Section */}
            {selectedPlanet.distance && (
              <p className="text-gray-300 mb-4"><strong>Khoảng cách:</strong> {selectedPlanet.distance}</p>
            )}
            {selectedPlanet.missions && (
              <p className="text-gray-300 mb-4"><strong>Chuyến thám hiểm:</strong> {selectedPlanet.missions.join(', ')}</p>
            )}
            
            <h3 className="text-xl font-semibold mb-4 text-white">Thông tin thú vị:</h3>
            <ul className="space-y-3 mb-6">
              {selectedPlanet.facts.map((fact, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-300">
                  <Star className="text-purple-400 mt-1" size={16} />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlanet(null)}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity text-white font-medium"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
