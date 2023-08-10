import dotenv from "dotenv";

dotenv.config();

export const env = {
  oAuth: {
    google: {
      id: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};
