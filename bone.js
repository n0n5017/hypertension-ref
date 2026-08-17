document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("complication-search");
  const categoryGroups = document.querySelectorAll(".category-group");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      categoryGroups.forEach((group) => {
        const listItems = group.querySelectorAll("li");
        let visibleCount = 0;

        listItems.forEach((item) => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            item.style.display = "list-item";
            visibleCount++;
          } else {
            item.style.display = "none";
          }
        });

        if (visibleCount === 0 && searchTerm !== "") {
          group.style.display = "none";
        } else {
          group.style.display = "block";
        }
      });
    });
  }

  const categoryHeaders = document.querySelectorAll(".category-group h3");

  categoryHeaders.forEach((header) => {
    header.style.cursor = "pointer";
    header.title = "Click to toggle category";

    header.addEventListener("click", () => {
      const targetList = header.nextElementSibling;
      if (targetList && targetList.tagName === "OL") {
        const isHidden = targetList.style.display === "none";
        targetList.style.display = isHidden ? "block" : "none";
        header.style.opacity = isHidden ? "0.6" : "1";
      }
    });
  });

  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
});
