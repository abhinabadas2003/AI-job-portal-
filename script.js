const API_BASE_URL = "http://localhost:5000";
// ================= Homepage Button =================
document.getElementById("recommend-btn")?.addEventListener("click", () => {
    alert("AI is analyzing your profile and recommending jobs!");
});

// ================= Login Form =================
document.getElementById("login-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Login successful (demo)!");
});

// ================= Signup Form =================
document.getElementById("signup-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Signup successful (demo)!");
});

// ================= Job Recommendations =================
const jobs = [
    { title: "Frontend Developer", company: "Tech Corp", location: "Remote" },
    { title: "Backend Developer", company: "AI Solutions", location: "Bangalore" },
    { title: "Data Scientist", company: "Data Wizards", location: "Mumbai" },
    { title: "UI/UX Designer", company: "Design Studio", location: "Remote" },
];

const jobCardsContainer = document.getElementById("job-cards");

if (jobCardsContainer) {
    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <button class="apply-btn">Apply Now</button>
        `;
        card.querySelector(".apply-btn").addEventListener("click", () => {
            alert(`AI recommends you to apply for ${job.title} at ${job.company}!`);
        });
        jobCardsContainer.appendChild(card);
    });
}