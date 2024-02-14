import { defineStore } from "pinia";

import { router } from "@/routes/router";
import { api } from "../api/backend";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
      // initialize state from local storage to enable user to stay logged in
      user: JSON.parse(localStorage.getItem("user")),
      returnUrl: null,
    }),
    actions: {
      async login(username: string, password: string) {
        api
          .post(`/api/login`, { username, password })
          .then((res) => {
            const access = res.data;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(access.user));
            localStorage.setItem("@OZ:token", access.access_token);
            api.defaults.headers.authorization = `Bearer ${access.access_token}`;
            // update pinia state
            this.user = {
              ...access.user,
              firstName: "user.firstName",
              lastName: "lastName",
            };
            router.push("/");
          })
          .catch((ex) => {
            console.log(ex);
            // redirect to previous url or default to home page
            router.push(this.returnUrl || "/");
          });
  
      },
      logout() {
        this.user = null;
        localStorage.removeItem("user");
        router.push("/login");
      },
    },
  });