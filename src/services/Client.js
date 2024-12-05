// src/services/Client.js
export default class Client {
  constructor(api_base, uuid) {
    this.api_base = api_base;
    this.uuid = uuid;
  }

  async storeLog(data) {
    const response = await fetch(`${this.api_base}/${this.uuid}/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to store log: ${response.statusText}`);
    }

    return await response.json();
  }
}
