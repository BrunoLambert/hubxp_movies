import * as React from 'react';
import { formatDate } from '../formatters';

describe("Helper Function", () => {
    it("Format Date", () => {
        const result = formatDate("2001-01-02")
        expect(result).toBe("02/01/2001")
    })
})