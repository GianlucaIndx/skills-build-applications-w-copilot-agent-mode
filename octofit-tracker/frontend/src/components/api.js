export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  const currentHost = window.location.hostname;

  if (currentHost.endsWith('.app.github.dev')) {
    const detectedCodespace = currentHost.replace(/-\d+\.app\.github\.dev$/, '');

    if (detectedCodespace) {
      return `https://${detectedCodespace}-8000.app.github.dev/api`;
    }
  }

  if (currentHost.endsWith('.github.dev')) {
    const detectedCodespace = currentHost.replace(/\.github\.dev$/, '');

    if (detectedCodespace) {
      return `https://${detectedCodespace}-8000.app.github.dev/api`;
    }
  }

  return 'http://localhost:8000/api';
}

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchCollection(resourcePath) {
  const apiBaseUrl = getApiBaseUrl();
  const response = await fetch(`${apiBaseUrl}/${resourcePath}/`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
}
