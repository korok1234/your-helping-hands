const form = document.querySelector('#inquiry-form');
if (form) {
  const service = document.querySelector('#service');
  const chosen = new URLSearchParams(location.search).get('service');
  if ([...service.options].some(option => option.value === chosen)) service.value = chosen;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = `Hello Your Helping Hands,\n\nI’d like to request a cleaning.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nToronto neighbourhood: ${data.get('area')}\nService: ${service.selectedOptions[0].text}\nFrequency: ${data.get('frequency')}\n\nAdditional details:\n${data.get('details') || 'None'}\n\nPlease let me know about availability and confirm the cleaning details. Thank you!`;
    document.querySelector('#email-copy').value = body;
    document.querySelector('#email-fallback').hidden = false;
    document.querySelector('#form-status').textContent = 'Your email is ready. Please send it from your email app to complete your request.';
    location.href = `mailto:contact@youhelpinghands.ca?subject=${encodeURIComponent('Toronto cleaning request — ' + service.selectedOptions[0].text)}&body=${encodeURIComponent(body)}`;
  });
}
