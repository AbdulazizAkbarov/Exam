document.addEventListener("DOMContentLoaded", () => {
    const xotira = document.querySelector(".xotira");
    const xotira1 = document.querySelector(".xotira1");
    const xotira2 = document.querySelector(".xotira2");
    const xotira3 = document.querySelector(".xotira3");
    const xotira4 = document.querySelector(".xotira4");
    const xotira111 = document.querySelector(".xotira1");
    const xotira11 = document.querySelector(".xotira11");
    const xotira21 = document.querySelector(".xotira21");
    const xotira31 = document.querySelector(".xotira31");
    const xotira41 = document.querySelector(".xotira41");
    const buttton = document.querySelector(".edite");
  
    async function fetchAndDisplayData() {
      try {
        let response = await fetch("http://localhost:3000/setup");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        let data = await response.json();
  
        const element = data[0]; 
        xotira.textContent = element.brand;
        xotira1.textContent = element.processor;
        xotira2.textContent = element.memory;
        xotira3.textContent = element.display;
        xotira4.textContent = element.model;
        xotira111.textContent = element.brand;
        xotira11.textContent = element.processor;
        xotira21.textContent = element.memory;
        xotira31.textContent = element.display;
        xotira41.textContent = element.model;
  
        buttton.addEventListener("click", async () => {
          let newBrand = prompt("Yangi Brand kirgazing", element.brand);
          let newProcessor = prompt("Yangi Processor kirgazing", element.processor);
          let newMemory = prompt("Yangi Memory kirgazing", element.memory);
          let newDisplay = prompt("Yangi Display kirgazing", element.display);
          let newModel = prompt("Yangi Model kirgazing", element.model);
  
          if (!newBrand || !newProcessor || !newMemory || !newDisplay || !newModel) {
            alert("Ma'lumotni qaytadan kiriting");
            return;
          }
  
          let updatedData = {
            brand: newBrand,
            processor: newProcessor,
            memory: newMemory,
            display: newDisplay,
            model: newModel,
          };
  
          try {
            let putResponse = await fetch(`http://localhost:3000/setup/${element.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            });
  
            if (putResponse.ok) {
              let updatedResponse = await fetch("http://localhost:3000/setup");
              let updatedData = await updatedResponse.json();
              const updatedElement = updatedData[0]; 
  
              xotira.textContent = updatedElement.brand;
              xotira1.textContent = updatedElement.processor;
              xotira2.textContent = updatedElement.memory;
              xotira3.textContent = updatedElement.display;
              xotira4.textContent = updatedElement.model;
              xotira111.textContent = updatedElement.brand;
              xotira11.textContent = updatedElement.processor;
              xotira21.textContent = updatedElement.memory;
              xotira31.textContent = updatedElement.display;
              xotira41.textContent = updatedElement.model;
            } else {
              alert("Xatolik yuz berdi");
            }
          } catch (error) {
            console.error("Xatolik yuz berdi:", error);
          }
        });
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  
    fetchAndDisplayData();
  });
  