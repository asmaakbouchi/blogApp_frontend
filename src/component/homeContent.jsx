import React from 'react';
import img_description from '../assets/image/programmer.jpg';

export default function HomeContent() {
  return (
    <div className="max-w-6xl my-2 mx-auto px-4 py-10">

      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600" >Description about Our Blog</h2>
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="md:w-1/2 md:mr-8 mb-4 md:mb-0">
          <img
            src={img_description}
            alt="Blog Image"
            className="w-full h-auto md:h-full object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Description Section */}
        <div className="md:w-1/2">
          <p className="text-base text-gray-700 leading-relaxed text-justify">
            At our blog, we're passionate about sharing the latest insights and knowledge in web development.
            Whether you're a seasoned developer or just starting out, our goal is to provide valuable resources,
            tutorials, and tips to help you succeed in your journey.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mt-4 text-justify">
            Explore our articles covering a wide range of topics, including front-end and back-end development,
            frameworks, programming languages, design principles, best practices, and more. We strive to deliver
            high-quality content that's informative, engaging, and relevant to today's web development landscape.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mt-4 text-justify">
            Whether you're looking to enhance your skills, stay up-to-date with industry trends, or simply
            find inspiration for your next project, you've come to the right place. Join our community of
            developers and learners as we continue to grow and evolve together in the ever-changing world of web development.
          </p>
        </div>
      </div>
    </div>
  );
}
