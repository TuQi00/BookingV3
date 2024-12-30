const $marker = document.querySelector(".marker");
const $listItems = document.querySelectorAll("ul li");

$listItems.forEach(($li) => {
  $li.addEventListener("mousemove", (event) => {
    $marker.style.left = $li.offsetLeft + "px";
    $marker.style.width = $li.offsetWidth + "px"; // Corrected from offsetLeft to offsetWidth
    document.querySelector(".active")?.classList.remove("active");
    $li.classList.add("active"); // Corrected from $list to $li
  });
});
