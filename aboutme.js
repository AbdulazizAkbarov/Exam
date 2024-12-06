document.addEventListener("DOMContentLoaded", () => {
    let text1 = document.querySelector(".edit1");
    let text2 = document.querySelector(".edit2");
    let rasmmmm = document.querySelector(".about_rasm");
    let edit7 = document.querySelector(".eddit");
  
    // Ma'lumotlarni yangilash funktsiyasi
    async function update() {
      try {
        let response = await fetch("http://localhost:3000/aboutme");
        if (!response.ok) {
          throw new Error("Serverdan ma'lumot olishda xatolik yuz berdi.");
        }
        let data = await response.json();
        text1.textContent = data.name;
        text2.textContent = data.bio;
        rasmmmm.src = data.imagess;
      } catch (error) {
        console.error("Xatolik:", error);
        alert("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      }
    }
  
    // Tahrirlash tugmasiga ishlov beruvchi
    edit7.addEventListener("click", async () => {
      let newName = prompt("Yangi ism kiriting");
      let newBio = prompt("Yangi bio kiriting");
      let newImage = prompt("Yangi rasm URL manzilini kiriting");
  
      // Foydalanuvchi to'liq ma'lumot kiritmagan bo'lsa
      if (!newName || !newBio || !newImage) {
        alert("Iltimos, barcha maydonlarni to'ldiring.");
        return;
      }
  
      let updatedData = {
        name: newName,
        bio: newBio,
        imagess: newImage,
      };
  
      try {
        let response = await fetch("http://localhost:3000/aboutme", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          alert("Ma'lumotlar muvaffaqiyatli yangilandi.");
          update(); // Yangi ma'lumotlarni yuklash
        } else {
          throw new Error("Ma'lumotlarni saqlashda xatolik yuz berdi.");
        }
      } catch (error) {
        console.error("Xatolik:", error);
        alert("Ma'lumotlarni saqlashda xatolik yuz berdi.");
      }
    });
  
    // Dastlabki ma'lumotlarni yuklash
    update();
  });
  