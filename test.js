document.addEventListener("DOMContentLoaded", () => {
  const testimonialsContainer = document.createElement("div");
  testimonialsContainer.className = "testimonials-container";
  document.body.appendChild(testimonialsContainer);

  const apiEndpoint = "http://localhost:3000/testimonials";

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return await response.json();
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      testimonialsContainer.innerHTML = "<p>Failed to load testimonials.</p>";
      return [];
    }
  };

  const renderTestimonials = async () => {
    const testimonialsData = await fetchTestimonials();
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

  const handleEdit = async (event) => {
    const id = event.target.getAttribute("data-id");
    const testimonialsData = await fetchTestimonials();
    const testimonial = testimonialsData.find((item) => item.id === id);

    if (!testimonial) return;

    const newName = prompt("Enter new name:", testimonial.name);
    const newRole = prompt("Enter new role:", testimonial.role);
    const newMessage = prompt("Enter new message:", testimonial.message);

    if (newName && newRole && newMessage) {
      const updatedTestimonial = {
        ...testimonial,
        name: newName,
        role: newRole,
        message: newMessage,
      };

      try {
        const response = await fetch(`${apiEndpoint}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTestimonial),
        });

        if (!response.ok) throw new Error("Failed to update testimonial");
        alert("Testimonial updated successfully!");
        renderTestimonials();
      } catch (error) {
        console.error("Error updating testimonial:", error);
        alert("Failed to update testimonial.");
      }
    } else {
      alert("All fields are required!");
    }
  };

  const handleDelete = async (event) => {
    const id = event.target.getAttribute("data-id");

    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await fetch(`${apiEndpoint}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete testimonial");
        alert("Testimonial deleted successfully!");
        renderTestimonials();
      } catch (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial.");
      }
    }
  };

  renderTestimonials();
});
