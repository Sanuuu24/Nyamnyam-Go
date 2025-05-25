import React, { useState } from 'react';

const categories = [
  {
    id: 1,
    name: 'Makanan',
    image: 'https://source.unsplash.com/400x300/?food',
    content: 'Ini adalah daftar makanan favorit.',
  },
  {
    id: 2,
    name: 'Elektronik',
    image: 'https://source.unsplash.com/400x300/?electronics',
    content: 'Ini adalah produk-produk elektronik.',
  },
  {
    id: 3,
    name: 'Fashion',
    image: 'https://source.unsplash.com/400x300/?fashion',
    content: 'Ini adalah fashion terkini.',
  },
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            onClick={() => handleClick(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="bg-white p-4 text-center">
              <h2 className="text-lg font-semibold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-xl font-bold mb-2">{selectedCategory.name}</h3>
          <p>{selectedCategory.content}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
