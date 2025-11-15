console.log("✅ donation.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
  const donateForm = document.getElementById("donate-form");
  const popupOverlay = document.getElementById("popup-overlay");

  if (!donateForm) return;

  // Handle donate form submission
  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🚀 Donate form submitted");

    // Collect values safely
    const nameInput = donateForm.querySelector('input[type="text"]');
    const amountInput = donateForm.querySelector('input[type="number"]');
    const paymentInput = donateForm.querySelector('input[type="text"]:nth-of-type(2)');
    const messageInput = donateForm.querySelector("textarea");

    const name = nameInput.value.trim() || "Anonymous";
    const amount = amountInput.value.trim();
    const payment_method = paymentInput.value.trim();
    const message = messageInput.value.trim();

    // Basic validation
    if (!amount || !payment_method) {
      alert("Please fill in the amount and payment method.");
      return;
    }

    try {
      // Send data to Laravel API
      const response = await fetch("http://127.0.0.1:8000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, amount, payment_method, message }),
      });

      const data = await response.json();
      console.log("📦 Server response:", data);

      if (response.ok) {
        showThankYouPopup(data.data.name);
        donateForm.reset();
      } else {
        alert(data.message || "Something went wrong while sending your donation.");
      }
    } catch (error) {
      console.error("Error sending donation:", error);
      alert("Failed to connect to server. Please try again.");
    }
  });

  // Show Thank You popup
  function showThankYouPopup(donorName) {
    const popup = document.createElement("div");
    popup.className = "thankyou-popup";
    popup.innerHTML = `
      <div class="thankyou-card">
        <h2>🎉 Thank You, ${donorName || "Donor"}!</h2>
        <p>Your donation was received successfully.<br><strong>CIIFI</strong> appreciates your support! 💖</p>
        <button id="close-thankyou">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    // Simple styling
    const style = document.createElement("style");
    style.innerHTML = `
      .thankyou-popup {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .thankyou-card {
        background: white;
        padding: 30px 40px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: popupFade 0.3s ease;
      }
      .thankyou-card h2 {
        margin-bottom: 10px;
        color: #16a34a;
      }
      #close-thankyou {
        background: #16a34a;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        margin-top: 15px;
        cursor: pointer;
      }
      @keyframes popupFade {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);

    // Close logic
    const closeBtn = document.getElementById("close-thankyou");
    closeBtn.addEventListener("click", () => popup.remove());
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.remove();
    });
  }
});
