(function () {
  const script = document.currentScript;
  const userId = script.getAttribute('data-user-id');

  const iframe = document.createElement('iframe');
  iframe.id = 'chat-widget-iframe';
  iframe.src = `http://localhost:3001?user_id=${userId}`;
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

  iframe.onload = () => {
    // Wait for iframe to signal it's ready before sending EMBED_ORIGIN
    window.addEventListener('message', function handleWidgetReady(event) {
      if (event.data?.type === 'WIDGET_READY') {
        iframe.contentWindow?.postMessage(
          {
            type: 'EMBED_ORIGIN',
            origin: window.location.origin,
            referrer: document.referrer,
          },
          'http://localhost:3001'
        );
        window.removeEventListener('message', handleWidgetReady);
      }
    });
  };

  window.toggleChatWidget = function (expand) {
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
