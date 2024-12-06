document.addEventListener("DOMContentLoaded", () => {
  const testimonialsContainer = document.createElement("div");
  testimonialsContainer.className = "testimonials-container";
  document.body.appendChild(testimonialsContainer);

  const localTestimonials =
    JSON.parse(localStorage.getItem("testimonials")) || [];

  const testimonialsData =
    localTestimonials.length > 0
      ? localTestimonials
      : [
          {
            id: "1",
            name: "John Smith",
            role: "Project Manager, TechCorp",
            message:
              "Jane's dedication and attention to detail are exceptional. She always delivers beyond expectations!",
            image: "https://via.placeholder.com/150",
          },
          {
            id: "2",
            name: "Emily Davis",
            role: "CEO, Startup Co.",
            message:
              "Working with Jane was a pleasure. Her ability to solve complex problems is unmatched.",
            image: "https://via.placeholder.com/150",
          },
        ];

  const saveToLocalStorage = (data) => {
    localStorage.setItem("testimonials", JSON.stringify(data));
  };

  const renderTestimonials = () => {
    testimonialsContainer.innerHTML = "";

    testimonialsData.forEach((testimonial) => {
      const testimonialCard = document.createElement("div");
      testimonialCard.className = "testimonial-card";

      testimonialCard.innerHTML = `
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image" />
          <h3 class="testimonial-name">${testimonial.name}</h3>
          <p class="testimonial-role">${testimonial.role}</p>
          <p class="testimonial-message">${testimonial.message}</p>
          <button class="edit-btn" data-id="${testimonial.id}">Edit</button>
          <button class="delete-btn" data-id="${testimonial.id}">Delete</button>
        `;

      testimonialsContainer.appendChild(testimonialCard);
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", handleEdit);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
  };

  const handleEdit = (event) => {
    const id = event.target.getAttribute("data-id");
    const testimonial = testimonialsData.find((item) => item.id === id);

    if (!testimonial) return;

    const newName = prompt("Enter new name:", testimonial.name);
    const newRole = prompt("Enter new role:", testimonial.role);
    const newMessage = prompt("Enter new message:", testimonial.message);

    if (newName && newRole && newMessage) {
      testimonial.name = newName;
      testimonial.role = newRole;
      testimonial.message = newMessage;

      saveToLocalStorage(testimonialsData);
      renderTestimonials();
      alert("Testimonial updated successfully!");
    }
  };

  const handleDelete = (event) => {
    const id = event.target.getAttribute("data-id");
    const index = testimonialsData.findIndex((item) => item.id === id);

    if (index !== -1) {
      testimonialsData.splice(index, 1);
      saveToLocalStorage(testimonialsData);
      renderTestimonials();
      alert("Testimonial ochirilsinmi");
    }
  };

  renderTestimonials();
});
