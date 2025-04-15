(function () {
    const script = document.currentScript;
    const userId = script.getAttribute('data-user-id');
  
    // Try to get the embedding site origin
    let origin = '';
    try {
      origin = new URL(document.referrer).origin;
    } catch (e) {
      origin = 'unknown';
    }
  
    const iframe = document.createElement('iframe');
    iframe.id = 'chat-widget-iframe';
    iframe.src = `https://chatbot-embed-phi.vercel.app/chat?user_id=${userId}&origin=${encodeURIComponent(origin)}`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '80px';
    iframe.style.height = '80px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '50%';
    iframe.style.zIndex = '999999';
    iframe.style.boxShadow = '0 0 12px rgba(0,0,0,0.2)';
    iframe.style.transition = 'all 0.3s ease';
  
    document.body.appendChild(iframe);
  
    window.toggleChatWidget = function (expand) {
      const iframe = document.getElementById('chat-widget-iframe');
      if (!iframe) return;
  
      if (expand) {
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.borderRadius = '12px';
      } else {
        iframe.style.width = '80px';
        iframe.style.height = '80px';
        iframe.style.borderRadius = '50%';
      }
    };
  
    window.addEventListener('message', function (event) {
      if (event.data?.type === 'TOGGLE_CHAT_WIDGET') {
        window.toggleChatWidget(event.data.expand);
      }
    });
  })();
  