(function () {
  // === 1. Inject CSS ===
  const style = document.createElement("style");
  style.textContent = `
    #overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 9998;
      opacity: 0;
      transition: opacity 0.6s ease-in-out;
    }
    #overlay.show {
      display: block;
      opacity: 1;
    }
    #popup-form {
      display: none;
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(0.85);
      background: white;
      padding: 25px;
      box-shadow: 0 0 20px rgba(0,0,0,0.4);
      z-index: 9999;
      width: 90%;
      max-width: 500px;
      border-radius: 12px;
      box-sizing: border-box;
      overflow-y: auto;
      max-height: 95vh;
      opacity: 0;
      transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
    }
    #popup-form.show {
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    #popup-form input,
    #popup-form select {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-sizing: border-box;
    }
    #popup-form label {
      display: block;
      margin-top: 15px;
      font-weight: bold;
    }
    #popup-form button {
      padding: 10px 15px;
      margin-top: 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    #popup-form button.close-btn {
      background-color: #6c757d;
      margin-left: 10px;
    }
    #apply-now-btn {
      margin: 20px auto;
      display: block;
      background-color: #28a745;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // === 2. Inject HTML ===
  const formHTML = `
    <div id="overlay" onclick="closeForm()"></div>
    <div id="popup-form">
      <form action="https://script.google.com/macros/s/AKfycbxoxVQai2oGxWkbSh68N4WQ830IQuEEfc8sB-AJbitNOy7yOfN9KUhJVvd_axRR85GeRA/exec"
            id="applyForm" method="post" onsubmit="return validateAndSubmit()" target="hidden_iframe">
        <h3>Apply Now</h3>
        <input name="name" placeholder="Your Name" required type="text" />
        <input name="email" placeholder="Your Email" required type="email" />
        <input name="phone" placeholder="Phone (With Country Code)" required type="tel" />
        <input name="company" placeholder="Current Company" required type="text" />
        <input name="job" placeholder="Job Title" required type="text" />
        <input name="education" placeholder="Education (e.g., B.Tech, MBA)" required type="text" />
        <input name="year" placeholder="Passing Year" required type="text" />
        <label>Country</label>
        <select name="country" required>
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>
        <label>Do you agree to share your data?</label>
        <select id="consentSelect" name="consent" required>
          <option value="">Select an option</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">Submit</button>
        <button class="close-btn" onclick="closeForm()" type="button">Cancel</button>
      </form>
    </div>
    <iframe name="hidden_iframe" style="display:none;"></iframe>
    <button id="apply-now-btn" onclick="openForm()">Apply Now</button>
  `;
  document.body.insertAdjacentHTML("beforeend", formHTML);

  // === 3. Inject JS ===
  window.openForm = function () {
    document.getElementById("overlay").classList.add("show");
    const popup = document.getElementById("popup-form");
    popup.style.display = "block";
    setTimeout(() => popup.classList.add("show"), 10);
  };

  window.closeForm = function () {
    document.getElementById("overlay").classList.remove("show");
    const popup = document.getElementById("popup-form");
    popup.classList.remove("show");
    setTimeout(() => (popup.style.display = "none"), 600);
  };

  window.validateAndSubmit = function () {
    const consent = document.getElementById("consentSelect").value;
    if (consent !== "Yes") {
      alert("You must consent to data sharing to proceed.");
      return false;
    }

    setTimeout(() => {
      alert("Thanks! Your application has been submitted.");
      document.getElementById("applyForm").reset();
      closeForm();
    }, 500);

    return true;
  };

  // Auto-popup after 2 seconds
  window.addEventListener("DOMContentLoaded", function () {
    setTimeout(openForm, 2000);
  });
})();

