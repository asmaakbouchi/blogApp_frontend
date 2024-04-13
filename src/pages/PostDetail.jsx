import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  console.log("id", id);
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`, {
      headers: {
        'auth': `Bearer ${localStorage.getItem('tokenkey')}`
      }
    })
      .then(res => {
        setPost(res.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  // Check if post.date exists before accessing its properties
  const formattedDate = post.date ? post.date.split('T')[0] : '';
  const formattedTime = post.date ? post.date.split('T')[1].substring(0, 8) : '';

  return (
    <div className="min-h-screen flex flex-col p-8 sm:p-16 md:p-24 justify-center bg-white">
      <div data-theme="teal" className="mx-auto max-w-6xl">
        <section className="font-sans text-black">
          <div className="[ lg:flex lg:items-center ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
            <div className="flex-shrink-0 self-stretch sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
              <div className="h-full">     
                    <img className="object-cover" src={post.image} width="500" alt={post.titre} />
              </div>
            </div>
            <div className="p-6 bg-grey">
              <div className="leading-relaxed">
                <h2 className="leading-tight text-4xl font-bold">{post.titre}</h2>
                <p className="mt-4">{post.contenu}</p>
                <p className="mt-4 bold">
                  <span className='font-semibold'>Post created By : </span> 
                  <span>{post.auteur}</span>
                </p>
                <div className="py-4">
                  <p className="text-black"> 
                    <span className='font-semibold'> Date creation : </span> 
                    {formattedDate}
                  </p>
                  <p className="text-black">
                    <span className='font-semibold'>Time creation : </span>
                    {formattedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
