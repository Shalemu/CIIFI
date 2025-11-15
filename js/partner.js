
// ===============================
// FETCH PARTNERS FROM API
// ===============================

async function loadPartners() {
    const container = document.getElementById("partners-carousel");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/partners");
        const result = await response.json();

        if (!response.ok) {
            console.error("Failed to load partners");
            return;
        }

        const partners = result.data;

        // Clear old content
        container.innerHTML = "";

        partners.forEach(partner => {
            const logoWrapper = document.createElement("div");
            logoWrapper.className = "partner-logo";

            // If image exists, use it
            if (partner.image) {
                logoWrapper.innerHTML = `
                    <img src="${partner.image}" alt="${partner.organization_name}">
                `;
            } else {
                // If no image, show name badge
                logoWrapper.innerHTML = `
                    <div style="
                        width: 140px;
                        height: 80px;
                        background: #e8f3ff;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 600;
                        color: #0f75bf;
                        text-align: center;
                        padding: 10px;">
                        ${partner.organization_name}
                    </div>
                `;
            }

            container.appendChild(logoWrapper);
        });

    } catch (err) {
        console.error("Failed to fetch partners:", err);
    }
}

// Load on page ready
document.addEventListener("DOMContentLoaded", loadPartners);




