async function loadIdeas() {

    const response = await fetch("/ideas");

    const ideas = await response.json();

    const container = document.getElementById("ideasContainer");

    container.innerHTML = "";

    ideas.forEach((idea) => {

        container.innerHTML += `

        <div class="idea-card">

            <span class="tag">${idea.category}</span>

            <h2>${idea.title}</h2>

            <p>${idea.description}</p>

            <div class="info">

                <span>
                    <i class="fas fa-users"></i>
                    ${idea.members} Members
                </span>

                <span>
                    <i class="fas fa-heart"></i>
                    ${idea.likes} Likes
                </span>

            </div>

            <button>View Details</button>

        </div>

        `;

    });

}

loadIdeas();