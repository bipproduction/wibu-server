/* eslint-disable @typescript-eslint/no-unused-vars */
const data = {
  session: {
    id: "",
    expiresAt: "",
    token: "",
    createdAt: "",
    updatedAt: "",
    ipAddress: "::1",
    userAgent: "",
    userId: "",
  },
  user: {
    id: "",
    name: "",
    email: "",
    emailVerified: true,
    image: "",
    createdAt: "",
    updatedAt: "",
  },
};

export type SESSION = typeof data;
