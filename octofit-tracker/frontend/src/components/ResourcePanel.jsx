import { useEffect, useMemo, useState } from 'react';
import { fetchCollection, getApiBaseUrl } from './api.js';

function ResourcePanel({ title, resourcePath }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const nextItems = await fetchCollection(resourcePath);
        if (active) {
          setItems(nextItems);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Unknown error');
          setItems([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [resourcePath]);

  const columns = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    const keySet = new Set();
    items.forEach((item) => {
      if (item && typeof item === 'object') {
        Object.keys(item).forEach((key) => keySet.add(key));
      }
    });

    return Array.from(keySet);
  }, [items]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">{title}</h2>
        <p className="text-body-secondary small mb-4">
          Endpoint: {getApiBaseUrl()}/{resourcePath}/
        </p>

        {loading && <div className="alert alert-info mb-0">Loading...</div>}

        {!loading && error && (
          <div className="alert alert-danger mb-0">Unable to load data: {error}</div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="alert alert-warning mb-0">No items returned by the API.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const rowKey = item?._id || item?.id || `${resourcePath}-${index}`;
                  return (
                    <tr key={rowKey}>
                      {columns.map((column) => (
                        <td key={`${rowKey}-${column}`}>
                          {typeof item?.[column] === 'object'
                            ? JSON.stringify(item[column])
                            : String(item?.[column] ?? '')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResourcePanel;
