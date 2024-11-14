// postData.test.js
import {jest} from '@jest/globals'

import { postData } from './script.js';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true })
    })
);

describe('postData', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should make a POST request with the correct URL and data', async () => {
        const url = 'https://example.com/api';
        const data = { name: 'Jonathan', age: 30 };

        const response = await postData(url, data);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        expect(response).toEqual({ success: true });
    });
});
