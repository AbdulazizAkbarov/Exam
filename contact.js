document.addEventListener("DOMContentLoaded", () => {
    const contactContainer = document.querySelector(".contact-container");
    const localStorageKey = "contactData";
  
    async function loadContactData() {
      let contactData;
      const storedData = localStorage.getItem(localStorageKey);
  
      if (storedData) {
        contactData = JSON.parse(storedData);
      } else {
        try {
          const response = await fetch("http://localhost:3000/contact");
          if (!response.ok) throw new Error("Failed to fetch contact data");
          contactData = await response.json();
          localStorage.setItem(localStorageKey, JSON.stringify(contactData));
        } catch (error) {
          console.error("Error fetching contact data:", error);
          return;
        }
      }
      displayContactData(contactData);
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
  
    function editContactData(data) {
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
  
        localStorage.setItem(localStorageKey, JSON.stringify(updatedData));
        displayContactData(updatedData);
        alert("Contact information updated successfully!");
      } else {
        alert("All fields are required!");
      }
    }
  
    function deleteContactData() {
      if (confirm("Are you sure you want to delete this contact information?")) {
        localStorage.removeItem(localStorageKey);
        contactContainer.innerHTML = "<p>No contact information available.</p>";
        alert("Contact information deleted successfully!");
      }
    }
  
    loadContactData();
  });
  