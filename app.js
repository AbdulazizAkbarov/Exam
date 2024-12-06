document.addEventListener("DOMContentLoaded", () => {
  let h1 = document.querySelector(".userName");
  let p = document.querySelector(".p_text");
  let image = document.querySelector(".main1_img");
  let edit = document.querySelector(".btn2");


  async function names() {
    try {
      let response = await fetch("http://localhost:3000/home");
      let data = await response.json();

      if (data.length === 0) {
        console.error("No data found!");
        return;
      }

      h1.textContent = data[0].title;
      p.textContent = data[0].subtitle;
      image.src = data[0].heroImage;

      edit.addEventListener("click", async () => {
        try {
          let newTitle = prompt("Yangi Title kirgazing", data[0].title);
          let newSubtitle = prompt(
            "Yangi Subtitle kirgazing ",
            data[0].subtitle
          );

          if (!newTitle || !newSubtitle) {
            alert("Ma'lumotni qaytadan kiriting");
            return;
          }

          let updatedData = {
            title: newTitle,
            subtitle: newSubtitle,
            heroImage: data[0].heroImage,
          };

          let response = await fetch(
            `http://localhost:3000/home/${data[0].id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );

          if (response.ok) {
            let newData = await fetch("http://localhost:3000/home");
            let newArr = await newData.json();

            h1.textContent = newArr[0].title;
            p.textContent = newArr[0].subtitle;
            image.src = newArr[0].heroImage;
          } else {
            alert("Xatolik yuz berdi");
          }
        } catch (error) {
          console.error("Xatolik:", error);
        }
      });
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  }

  names();
});
