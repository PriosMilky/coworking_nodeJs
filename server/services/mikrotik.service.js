// server/services/mikrotik.service.js
import https from 'https';
import http from 'http';

class MikroTikService {
    constructor() {
        this.host = process.env.MIKROTIK_HOST;
        this.port = process.env.MIKROTIK_PORT || 443;
        this.protocol = process.env.MIKROTIK_PROTOCOL || 'https';
        this.auth = Buffer.from(
            `${process.env.MIKROTIK_USERNAME}:${process.env.MIKROTIK_PASSWORD}`
        ).toString('base64');
    }

    #request(endpoint, method = 'GET', body = null) {
        return new Promise((resolve, reject) => {
            const isHttps = this.protocol === 'https';
            const lib = isHttps ? https : http;

            const options = {
                hostname: this.host,
                port: this.port,
                path: `/rest${endpoint}`,
                method,
                headers: {
                    'Authorization': `Basic ${this.auth}`,
                    'Content-Type': 'application/json'
                },
                rejectUnauthorized: isHttps ? false : undefined
            };

            const req = lib.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        try { resolve(JSON.parse(data)); }
                        catch { reject(new Error(`Respons bukan JSON: ${data}`)); }
                    } else {
                        reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                    }
                });
            });

            req.on('error', (err) => {
                reject(new Error(`${err.code || 'ERR'}: ${err.message}`));
            });

            if (body) req.write(JSON.stringify(body));
            req.end();
        });
    }

    async getHotspotProfiles() {
        const data = await this.#request('/ip/hotspot/profile');
        return data.map(p => p.name);
    }

    async createVoucherUser(username, password, profile, limitUptime = '10h') {
        const payload = {
            name: username,
            password,
            profile,
            'limit-uptime': limitUptime,
            disabled: 'false'
        };
        const result = await this.#request('/ip/hotspot/user', 'POST', payload);
        return { success: true, data: result };
    }
}

export const mikrotikService = new MikroTikService();