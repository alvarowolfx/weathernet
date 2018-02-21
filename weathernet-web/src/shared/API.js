import { stringify } from 'querystring';

const BASE_URL = 'http://localhost:8080';
const DEFAULT_TIMEOUT = 10 * 1000; // 10 seconds

const timeoutMessage =
  'Unfortunatly, your connect seens to be a little bit slow.';
async function timeout(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(timeoutMessage)), ms);
  });
}

class API {
  async fetchResource(resource, params = {}) {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    let method = resource.method;
    let fetchParams = { method, headers };

    let uri = `${BASE_URL}/${resource.path}`;

    if (method === 'GET') {
      uri += '?' + stringify(params);
    } else {
      fetchParams.body = JSON.stringify(params);
    }

    let response = await Promise.race([
      fetch(uri, fetchParams),
      timeout(DEFAULT_TIMEOUT)
    ]);

    if (method === 'DELETE') {
      return {};
    }

    let jsonResponse = await response.json();
    return jsonResponse;
  }

  getAll(resource, params) {
    return this.fetchResource({ method: 'GET', path: resource }, params);
  }

  deleteOne(resource, id) {
    const path = `${resource}/${id}`;
    return this.fetchResource({ method: 'DELETE', path });
  }

  save(resource, data) {
    if (data._id) {
      const path = `${resource}/${data._id}`;
      return this.fetchResource({ method: 'PUT', path }, data);
    } else {
      return this.fetchResource({ method: 'POST', path: resource }, data);
    }
  }
}

export default new API();
