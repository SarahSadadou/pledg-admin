'use client';
import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  images: string[];
}

const BlogPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [counter, setCounter] = useState(1);
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const handleAddBlog = () => {
    if (title.trim() && description.trim() && category.trim() && author.trim()) {
      const newBlog: BlogPost = {
        id: counter,
        title,
        description,
        category,
        author,
        images,
      };
      setBlogs([newBlog, ...blogs]);
      setCounter(counter + 1);
      resetForm();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            if (newImages.length === files.length) {
              setImages(newImages);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setAuthor('');
    setImages([]);
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setActiveBlog(null);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setTitle(blog.title);
    setDescription(blog.description);
    setCategory(blog.category);
    setAuthor(blog.author);
    setImages(blog.images);
    setActiveBlog(blog);
  };

  const handleUpdateBlog = () => {
    if (activeBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === activeBlog.id
          ? { ...blog, title, description, category, author, images }
          : blog
      );
      setBlogs(updatedBlogs);
      setActiveBlog(null);
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-gray-100 shadow-xl rounded-3xl p-8 ml-10 md:ml-40">
        <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
          ✨ {activeBlog ? 'Modifier le Blog' : 'Créer un Nouveau Blog'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Titre du blog" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-3 rounded-lg w-full bg-white" />
          <input type="text" placeholder="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-3 rounded-lg w-full bg-white" />
          <input type="text" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} className="border p-3 rounded-lg w-full bg-white" />
          <input type="file" accept="image/*" multiple onChange={handleImageChange} className="border p-3 rounded-lg w-full bg-white" />
        </div>
        <textarea placeholder="Description du blog" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded-lg w-full mb-4 bg-white" rows={4} />

        {images.length > 0 && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Prévisualisation des images :</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}

        <button onClick={activeBlog ? handleUpdateBlog : handleAddBlog} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-lg w-full transition duration-300">
          {activeBlog ? '💾 Mettre à jour le blog' : '➕ Publier le blog'}
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">🖼️ Blogs publiés</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">Aucun blog publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} onClick={() => setActiveBlog(blog)} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                {blog.images.length > 0 ? (
                  <img src={blog.images[0]} alt={blog.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700">Pas d'image</div>
                )}
                <div className="p-3 text-center">
                  <h3 className="font-bold text-pink-600">{blog.title}</h3>
                  <p className="text-sm text-gray-500">{blog.category} | {blog.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vue détaillée pour le blog actif */}
        {activeBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg max-w-lg p-6 relative">
              <button onClick={() => setActiveBlog(null)} className="absolute top-2 right-2 text-red-500">✖</button>
              <h2 className="text-2xl font-bold mb-2">{activeBlog.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{activeBlog.category} | {activeBlog.author}</p>
              <p className="mb-4">{activeBlog.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {activeBlog.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`img-${idx}`} className="w-full h-32 object-cover rounded" />
                ))}
              </div>
              <div className="flex gap-4">
              <button onClick={() => handleEditBlog(activeBlog)} className="text-sm ">✏️ Modifier</button>
<button onClick={() => handleDeleteBlog(activeBlog.id)} className="text-sm ">🗑️ Supprimer</button>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
