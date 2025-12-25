chrome.storage.local.get(["targetCode", "targetYear", "isAutomationActive", "retryCount", "showErrorOnSearch"], (data) => {
  
  if (data.showErrorOnSearch && window.location.href.includes("course/search.php")) {
      const errorDiv = document.createElement('div');
      const imgUrl = chrome.runtime.getURL('copilot.gif');
      
      errorDiv.innerHTML = `
        <div id="pilot-close-btn" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 24px; opacity: 0.8;">&times;</div>
        <img src="${imgUrl}" style="width: 60px; height: auto; margin-bottom: 15px; border-radius: 8px;">
        <div id="pilot-msg-text" style="font-size: 16px; line-height: 1.5; min-height: 24px;"></div>
      `;

      errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        color: white;
        padding: 30px 40px;
        border-radius: 16px;
        z-index: 10001;
        font-family: 'Segoe UI', sans-serif;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 320px;
      `;
      document.body.appendChild(errorDiv);

      const msg = "Sorry, I couldn't access the course you wanted.";
      const textEl = document.getElementById('pilot-msg-text');
      let charIndex = 0;
      function typeText() {
        if (charIndex < msg.length) {
          textEl.textContent += msg.charAt(charIndex);
          charIndex++;
          setTimeout(typeText, 40);
        }
      }
      setTimeout(typeText, 300);
      
      document.getElementById('pilot-close-btn').addEventListener('click', () => {
        errorDiv.remove();
      });
      
      chrome.storage.local.remove("showErrorOnSearch");
  }

  if (!data.isAutomationActive) return;

  if (!window.location.href.includes("login/index.php") && 
      !window.location.href.includes("course/search.php") && 
      !window.location.href.includes("enrol/index.php") &&
      !window.location.href.includes("course/view.php")) {
    window.location.replace(`https://oulms.ou.ac.lk/course/search.php?search=${data.targetCode}`);
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 150, 255, 0.8) 0%, rgba(0, 150, 255, 0.4) 50%, rgba(0, 150, 255, 0) 100%);
      transform: scale(0);
      animation: ripple-advanced 0.8s ease-out;
      pointer-events: none;
      box-shadow: 0 0 20px rgba(0, 150, 255, 0.7), 0 0 40px rgba(0, 150, 255, 0.4);
    }
    @keyframes ripple-advanced {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      50% {
        transform: scale(2);
        opacity: 0.6;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  function animateAndClick(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
    ripple.style.position = 'fixed';
    ripple.style.zIndex = '10000';
    
    document.body.appendChild(ripple);

    setTimeout(() => {
      setTimeout(() => {
        element.click();
        setTimeout(() => {
          ripple.remove();
        }, 800);
      }, 400);
    }, 100);
  }

  const currentUrl = window.location.href;

  if (currentUrl.includes("login/index.php")) {
    const logoutBtn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
                          .find(el => el.textContent.toLowerCase().includes("log out") || (el.value && el.value.toLowerCase().includes("log out")));
    
    if (logoutBtn) {
      animateAndClick(logoutBtn);
      return;
    }

    const guestBtn = Array.from(document.querySelectorAll('button, input[type="submit"]'))
                          .find(el => el.textContent.toLowerCase().includes("guest") || el.value.toLowerCase().includes("guest"));
    if (guestBtn) {
      animateAndClick(guestBtn);
    }
  }

  if (currentUrl.includes("course/search.php")) {
    const courseLink = Array.from(document.querySelectorAll('a'))
                            .find(link => link.innerText.toLowerCase().includes(data.targetCode.toLowerCase()) && 
                                         link.href.includes('course/view'));
    if (courseLink) {
      animateAndClick(courseLink);
    } else {
      setTimeout(() => {
        const courseLinkRetry = Array.from(document.querySelectorAll('a'))
                                    .find(link => link.innerText.toLowerCase().includes(data.targetCode.toLowerCase()) && 
                                                 link.href.includes('course/view'));
        if (courseLinkRetry) {
          animateAndClick(courseLinkRetry);
        }
      }, 2000);
    }
  }

  if (currentUrl.includes("enrol/index.php") || currentUrl.includes("course/view.php")) {
    const pageText = document.body.textContent || document.body.innerText;
    if (pageText.includes("Guests cannot access this course") || pageText.includes("Please log in") || pageText.includes("Incorrect access password")) {
      
      const currentRetry = data.retryCount || 0;
      
      if (currentRetry < 1) {
        const retryDiv = document.createElement('div');
        const logoUrl = chrome.runtime.getURL('logo.png');
        
        retryDiv.innerHTML = `
          <img src="${logoUrl}" style="width: 40px; height: 40px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;">
          <div>Guest access failed. Retrying one more time...</div>
        `;
        
        retryDiv.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #f5130bff 0%, #ea580c 100%);
          color: white;
          padding: 20px 30px;
          border-radius: 10px;
          z-index: 10001;
          font-size: 16px;
          font-family: Arial, sans-serif;
          text-align: center;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6), 0 0 40px rgba(234, 88, 12, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
        `;
        document.body.appendChild(retryDiv);

        setTimeout(() => {
          retryDiv.remove();
          chrome.storage.local.set({ "retryCount": currentRetry + 1 });
          window.location.href = `https://oulms.ou.ac.lk/course/search.php?search=${data.targetCode}`;
        }, 3000);
        return;
      }

      chrome.storage.local.set({ "showErrorOnSearch": true });
      window.location.href = `https://oulms.ou.ac.lk/course/search.php?search=${data.targetCode}`;
      chrome.storage.local.remove("isAutomationActive");
      return; 
    }

    const passwordInput = document.querySelector('input[type="password"]');
    const submitBtn = document.querySelector('input[type="submit"], button[type="submit"]');

    if (passwordInput && !passwordInput.getAttribute('data-typing')) {
      passwordInput.setAttribute('data-typing', 'true');
      const guestPassword = `${data.targetCode}_${data.targetYear}`;
      let i = 0;

      const typingInterval = setInterval(() => {
        passwordInput.value += guestPassword[i];
        i++;

        if (i >= guestPassword.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            if (submitBtn) {
              animateAndClick(submitBtn);
            }
          }, 500);
        }
      }, 150);
    } else if (currentUrl.includes("course/view.php") && !pageText.includes("Guests cannot access this course")) {
        
        const successDiv = document.createElement('div');
        const successImgUrl = chrome.runtime.getURL('success.gif');
        
        successDiv.innerHTML = `
          <div id="pilot-success-close-btn" style="position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 24px; opacity: 0.8;">&times;</div>
          <img src="${successImgUrl}" style="width: 80px; height: auto; margin-bottom: 15px; border-radius: 8px;">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Access Granted!</div>
          <div style="font-size: 14px; opacity: 0.9;">You have successfully entered the course.</div>
        `;

        successDiv.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%);
          color: black;
          padding: 30px 40px;
          border-radius: 16px;
          z-index: 10001;
          font-family: 'Segoe UI', sans-serif;
          text-align: center;
          box-shadow: 0 0 20px rgba(209, 209, 209, 0.6), 0 0 40px rgba(155, 155, 155, 0.4);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 300px;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        
        if (!document.getElementById('pilot-animations')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'pilot-animations';
            styleSheet.innerText = `
                @keyframes popIn {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(successDiv);
        
        document.getElementById('pilot-success-close-btn').addEventListener('click', () => {
            successDiv.remove();
        });

        setTimeout(() => {
            if(document.body.contains(successDiv)) {
                successDiv.style.opacity = '0';
                successDiv.style.transition = 'opacity 0.5s ease';
                setTimeout(() => successDiv.remove(), 500);
            }
        }, 5000);

        chrome.storage.local.remove("isAutomationActive");
    }
  }
});