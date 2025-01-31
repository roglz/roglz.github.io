const text = "data scientist ";
        let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("text").textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = function () {
    setTimeout(typeWriter, 500);
};

document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.querySelector("#portfolio .row");
    const projectsPerPage = 9;
    let currentPage = 1;
    let projects = [];

    fetch("../../data/projects.json")
        .then(response => response.json())
        .then(data => {
            projects = data;
            renderProjects();
            createPagination();
        })
        .catch(error => console.error("Error cargando projects.json:", error));

    function renderProjects() {
        projectsContainer.innerHTML = "";

        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const projectsToShow = projects.slice(startIndex, endIndex);

        projectsToShow.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("col-md-4", "mb-4");

            projectCard.innerHTML = `
                <a class="text-decoration-none" href="${project.url}">
                <div class="card">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                    </div>
                </div>
                </a>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }

    function createPagination() {
        const totalPages = Math.ceil(projects.length / projectsPerPage);

        if (totalPages <= 1) return;

        const paginationContainer = document.createElement("div");
        paginationContainer.classList.add("pagination-container", "mt-4", "d-flex", "justify-content-center");

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("btn", "btn-dark", "mx-1");
            pageButton.innerText = i;
            if (i === currentPage) {
                pageButton.classList.add("active");
            }

            pageButton.addEventListener("click", function () {
                currentPage = i;
                renderProjects();
                updatePagination();
            });

            paginationContainer.appendChild(pageButton);
        }

        projectsContainer.parentElement.appendChild(paginationContainer);
    }

    function updatePagination() {
        const buttons = document.querySelectorAll(".pagination-container button");
        buttons.forEach((button, index) => {
            button.classList.toggle("active", index + 1 === currentPage);
        });
    }
});
