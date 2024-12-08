/* eslint-env jest */
export const fetchMockConfig = jest.fn(() =>
  Promise.resolve({
    cookies: [{ name: "test-cookie", accepted: false }],
    theme: {},
  })
);
