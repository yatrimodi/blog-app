const posts = [
  {
    id: 1,
    title: "Intro to JavaScript",
    content: "Learn the basics of JS...",
    date: "2024-06-01",
    category: "tech",
    comments: []
  },
  {
    id: 2,
    title: "Healthy Habits",
    content: "Tips for a better lifestyle...",
    date: "2024-05-20",
    category: "life",
    comments: []
  }
];

const container = document.getElementById("blog-container");
const filter = document.getElementById("filter-category");
const sort = document.getElementById("sort-date");

function renderPosts() {
  const selectedCategory = filter.value;
  const sortOrder = sort.value;

  let filtered = posts.filter(post => 
    selectedCategory === "all" || post.category === selectedCategory
  );

  filtered.sort((a, b) => 
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  container.innerHTML = "";
  filtered.forEach(post => {
    const postEl = document.createElement("div");
    postEl.className = "bg-white shadow-md p-6 rounded-lg";

    const commentsHTML = post.comments.map(c => `<p class="text-sm text-gray-700 bg-gray-100 rounded px-3 py-1 mb-1">💬 ${c}</p>`).join("");

    postEl.innerHTML = `
      <h3 class="text-xl font-semibold text-blue-700 mb-2">${post.title}</h3>
      <p class="text-gray-700 mb-3">${post.content}</p>
      <div class="text-sm text-gray-500 mb-3">Category: ${post.category} | Date: ${post.date}</div>
      <div class="mt-4">
        <textarea placeholder="Add a comment..." class="w-full border rounded p-2 mb-2"></textarea>
        <button onclick="addComment(${post.id}, this)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Post</button>
        <div class="mt-3">${commentsHTML}</div>
      </div>
    `;
    container.appendChild(postEl);
  });
}

function addComment(postId, btn) {
  const post = posts.find(p => p.id === postId);
  const textarea = btn.previousElementSibling;
  const comment = textarea.value.trim();
  if (comment) {
    post.comments.push(comment);
    textarea.value = "";
    renderPosts();
  }
}

filter.addEventListener("change", renderPosts);
sort.addEventListener("change", renderPosts);

renderPosts();
