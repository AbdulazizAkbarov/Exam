document.addEventListener("DOMContentLoaded", () => {
  const portfolioContainer = document.querySelector(".portfolio-content");

  let portfolioData = JSON.parse(localStorage.getItem("portfolio")) || [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A responsive e-commerce platform with user-friendly design and payment integration.",
      image: "https://s3-alpha-sig.figma.com/img/cde1/ed3f/8fef957d91df8b936cfec57c896c18cd?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n1qvZeKY6Jp1csAUSh5YdNxgaDUeLVFwuXwgztY-sRb6ND34LjlZgw8HH10cl1QF4YWUyMs8JAhN3QjSPfHC8yELLRi6E~2~cAI3o9Ot8Pc0s04iC8jUTE7p5hUoOlL6EEWvEVeu6jH6H-4XRb6GrPG8E0Ngl22w-NiNpTwdsxN4-gJXdUAXDjU42LSnj8KVK9Af3qJqg4WHCqQk0NqwUxamvnaW13jRwJAq03swvxJomZ7k9~~USTHXkf3KZc9hzuf88Wue3OXoWxhDRDfxiZPpxUw44nbhrRX21wVqk27zJv8tpyhDSOLUllggXqfjH~g6COe-A1NJ6brlsBljNg__",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website built to showcase projects and skills.",
      image: "https://s3-alpha-sig.figma.com/img/5434/3298/a141a5f4577a33b778bf2014ec405b7f?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7xoE9AYL8mduCmmGaC~WtNdGkgxyeSDlS3K3K9ZAxZfknl5VbEYstxV1Ic4lgwtXAzJJmFhMOh8NT2fodc1kkNkKEPSe9-rg2tQEH2nXIfpLYLoZqkuwLRuCUxA12euz9lkUYGPs7cLAdKoc-my4Wt5ToY-60CPKJKUcEr9cf8nryXdY5q1bpy0hLJ8g2obC5u3EUfYSt5NhzI6CjLiZWDjM4FBkLRZqpjBdn08IiPEuhBS57axRLgJ2-wPUA5O1hWUjm468lz-kS8OrqKQmdYqY121P13N4LWhmn6SNCRU6FABs3oimcwdpTlNr1SU7oPvbe4b8~TnyIeuJhDCOw__",
    },
  ];

  const renderPortfolios = () => {
    portfolioContainer.innerHTML = "";
    portfolioData.forEach((item) => {
      const portfolioBox = document.createElement("div");
      portfolioBox.classList.add("portfolio-box");

      if(item.id == 1){
        portfolioBox.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="portfolio-image" width="602px" height="327px">
        <div class="portfolio-box_content">
          <h2 class="Portfolio-title">${item.title}</h2>
          <p class="Portfolio-desc">${item.description}</p>
          <div class="portfolioBtn-box btn-box">
            <button class="edit-btn" data-id="${item.id}">Edit <i class="fa-solid fa-pen"></i></button>
            <button class="delete-btn" data-id="${item.id}">Delete <i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
      portfolioContainer.appendChild(portfolioBox);
      }
      if(item.id == 2){
        portfolioBox.innerHTML = `
          <div class="portfolio-box_content">
            <h2 class="Portfolio-title">${item.title}</h2>
            <p class="Portfolio-desc">${item.description}</p>
            <div class="portfolioBtn-box btn-box">
              <button class="edit-btn" data-id="${item.id}">Edit <i class="fa-solid fa-pen"></i></button>
              <button class="delete-btn" data-id="${item.id}">Delete <i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
          <img src="${item.image}" alt="${item.title}" class="portfolio-image" width="602px" height="327px">
        `;
      portfolioContainer.appendChild(portfolioBox);
      }
    });

    attachEventListeners();
  };

  const attachEventListeners = () => {
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const portfolioItem = portfolioData.find((item) => item.id === id);

        const newTitle = prompt("Enter new title:", portfolioItem.title);
        const newDescription = prompt("Enter new description:", portfolioItem.description);
        if (newTitle && newDescription) {
          portfolioItem.title = newTitle;
          portfolioItem.description = newDescription;
          saveToLocalStorage();
          renderPortfolios();
        }
      });
    });


    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        portfolioData = portfolioData.filter((item) => item.id !== id);
        saveToLocalStorage();
        renderPortfolios();
      });
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("portfolio", JSON.stringify(portfolioData));
  };

  renderPortfolios();
});