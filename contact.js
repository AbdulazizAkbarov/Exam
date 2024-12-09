document.addEventListener("DOMContentLoaded", () => {
  const contactContainer = document.querySelector(".contact-container");
  const apiEndpoint = "http://localhost:3000/contact";

  async function loadContactData() {
      try {
          const response = await fetch(apiEndpoint);
          if (!response.ok) throw new Error("Failed to fetch contact data");
          const contactData = await response.json();
          displayContactData(contactData);
      } catch (error) {
          console.error("Error fetching contact data:", error);
          contactContainer.innerHTML = "<p>Failed to load contact information.</p>";
      }
  }

  function displayContactData(data) {
      if (!data) return;

      contactContainer.innerHTML = `
          <div class="contact-info">
              <p><b>Email:</b> <span class="contact-email">${data.email}</span></p>
              <p><b>Phone:</b> <span class="contact-phone">${data.phone}</span></p>
              <p><b>Address:</b> <span class="contact-address">${data.address}</span></p>
              <p><a href="${data.mapLink}" target="_blank" class="contact-map">View on Map</a></p>
              <div class="contact-actions">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
              </div>
          </div>
      `;

      document.querySelector(".edit-btn").addEventListener("click", () => editContactData(data));
      document.querySelector(".delete-btn").addEventListener("click", deleteContactData);
  }

  async function editContactData(data) {
      const newEmail = prompt("Enter new email:", data.email);
      const newPhone = prompt("Enter new phone number:", data.phone);
      const newAddress = prompt("Enter new address:", data.address);

      if (newEmail && newPhone && newAddress) {
          const updatedData = {
              email: newEmail,
              phone: newPhone,
              address: newAddress,
              mapLink: data.mapLink,
          };

          try {
              const response = await fetch(apiEndpoint, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedData),
              });

              if (!response.ok) throw new Error("Failed to update contact data");
              const updatedContact = await response.json();
              displayContactData(updatedContact);
              alert("Contact information updated successfully!");
          } catch (error) {
              console.error("Error updating contact data:", error);
              alert("Failed to update contact information.");
          }
      } else {
          alert("All fields are required!");
      }
  }

  async function deleteContactData() {
      if (confirm("Are you sure you want to delete this contact information?")) {
          try {
              const response = await fetch(apiEndpoint, {
                  method: "DELETE",
              });

              if (!response.ok) throw new Error("Failed to delete contact data");
              contactContainer.innerHTML = "<p>No contact information available.</p>";
              alert("Contact information deleted successfully!");
          } catch (error) {
              console.error("Error deleting contact data:", error);
              alert("Failed to delete contact information.");
          }
      }
  }

  loadContactData();
});
